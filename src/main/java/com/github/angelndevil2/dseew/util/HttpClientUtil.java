package com.github.angelndevil2.dseew.util;

import com.google.common.net.UrlEscapers;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.jetty.client.ContentExchange;
import org.eclipse.jetty.client.HttpClient;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;

/**
 * start jetty http client and use them
 *
 * @author k, Created on 16. 3. 2.
 */
@Slf4j
public class HttpClientUtil {

    @Getter
    private static final HttpClient client = new HttpClient();
    static {
        try {
            client.start();
        } catch (Exception e) {
            log.error("http client start failed.");
        }
    }

    /**
     *
     * @param host host address
     * @return JSONArray of mbean servers
     *
     * @throws Exception
     */
    public static JSONArray getMBeanServers(String host) throws Exception {

        JSONParser parser = new JSONParser();
        return (JSONArray) parser.parse(getResultContentExchange("http://"+host+"/mbean-servers").getResponseContent());
    }

    /**
     *
     * @param host
     * @param id
     * @return
     * @throws Exception
     */
    public static JSONArray getMBeanDomains(String host, String id) throws Exception {
        JSONParser parser = new JSONParser();
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/domains/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id));
        return (JSONArray) parser.parse(getResultContentExchange(uri.toString()).getResponseContent());
    }

    public static JSONArray getMBeans(String host, String id) throws Exception {
        JSONParser parser = new JSONParser();
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/mbeans/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id));
        return (JSONArray) parser.parse(getResultContentExchange(uri.toString()).getResponseContent());
    }

    public static JSONArray getMBeans(String host, String id, String domain) throws Exception {
        JSONParser parser = new JSONParser();
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/mbeans/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id))
                .append("/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(domain));
        return (JSONArray) parser.parse(getResultContentExchange(uri.toString()).getResponseContent());
    }

    /**
     *
     * @param host
     * @param id
     * @param oname
     * @param name
     * @return JSONObject of {name: return string}
     * @throws Exception
     */
    public static String getMBeanAttribute(String host, String id, String oname, String name) throws Exception {
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/mbean/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id))
                .append("/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(oname))
                .append("/attribute/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(name));

        return getResultContentExchange(uri.toString()).getResponseContent();
    }

    public static String getMBeanAttribute(String host, String id, String oname, String name, String type) throws Exception {
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/mbean/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id))
                .append("/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(oname))
                .append("/attribute/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(name))
                .append("/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(type));

        return getResultContentExchange(uri.toString()).getResponseContent();
    }

    public static JSONArray getMBeanInfo(String host, String id, String oname) throws Exception {
        JSONParser parser = new JSONParser();
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/mbean-info/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id))
                .append("/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(oname));
        return (JSONArray) parser.parse(
                getResultContentExchange(uri.toString()).getResponseContent());
    }

    public static JSONArray getMBeanAttributes(String host, String id, String oname) throws Exception {
        JSONParser parser = new JSONParser();
        StringBuilder uri = new StringBuilder("http://");
        uri
                .append(UrlEscapers.urlPathSegmentEscaper().escape(host))
                .append("/mbean-info/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(id))
                .append("/")
                .append(UrlEscapers.urlPathSegmentEscaper().escape(oname))
                .append("/attributes");
        return (JSONArray) parser.parse(
                getResultContentExchange(uri.toString()).getResponseContent());
    }

    /**
     * run client with blocking mode and return the result content exchange
     * @param url
     * @return content exchange with result
     * @throws Exception
     */
    public static ContentExchange getResultContentExchange(String url) throws Exception {

        ContentExchange exchange = new ContentExchange(true);
        exchange.setURL(url);
        client.send(exchange);

        // Waits until the exchange is terminated
        exchange.waitForDone();

        return exchange;
    }

}
