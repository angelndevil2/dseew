/**
 * @param host address on which universal-jvm-agent is running
 * @returns {string} query url for mbean server ids
 */
function getMBeanServerIdQueryUri(host) {
    var mbeanServerIdQuery = "/mbean-servers/{host}";
    return mbeanServerIdQuery.replace("{host}", host);
}

/**
 * @param host host address on which universal-jvm-agent is running
 * @param id mbean server id
 * @returns {string} query url for domains in mbean server
 */
function getMBeanDomainsQueryUri(host, id) {
    var mbeanDomainsQuery = "/domains/{host}/{id}";
    return mbeanDomainsQuery.replace("{host}", host).replace("{id}", id);
}

/**
 * @param host host address on which universal-jvm-agent is running
 * @param id mbean server id
 * @param domain in mbean server
 * @returns {string} query url for object name
 */
function getDomainMBeansQueryUri(host, id, domain) {
    var domainMBeanQuery = "/mbeans/{host}/{id}/{domain}";
    return domainMBeanQuery.replace("{host}", host).replace("{id}", id).replace("{domain}", domain);
}

/**
 *
 * @param host host address on which universal-jvm-agent is running
 * @param id mbean server id
 * @param oname object name
 * @returns {string} query url for mbean info
 */
function getMBeanInfoQueryUrl(host, id, oname) {
    var mbeanInfoQuery = "/mbean-info/{host}/{id}/{object-name}";
    return mbeanInfoQuery.replace("{host}", host).replace("{id}", id).replace("{object-name}", encodeURIComponent(oname));
}

/**
 * Get attributes from mbean info
 *
 * @param host
 * @param id
 * @param oname
 * @returns {string}
 */
function getMBeanAttributesQueryUri(host, id, oname) {
    var mbeanAttributeQuery = "/mbean-info/{host}/{id}/{object-name}/attributes";
    return mbeanAttributeQuery.replace("{host}", host).replace("{id}", id).replace("{object-name}", encodeURIComponent(oname));
}

/**
 *
 * @param host
 * @param id
 * @param oname
 * @param aname
 * @param type
 * @returns {string}
 */
function getMBeanAttributeQueryUri(host, id, oname, aname, type) {

    var mbeanAtrributeQuery;
    if (type == null) {
        mbeanAtrributeQuery = "/mbean/{host}/{id}/{object-name}/attribute/{name}";
        return mbeanAtrributeQuery.replace("{host}", host).replace("{id}", id).replace("{object-name}", encodeURIComponent(oname)).replace("{name}", aname);
    }

    mbeanAtrributeQuery = "/mbean/{host}/{id}/{object-name}/attribute/{name}/{type}";
    return mbeanAtrributeQuery.replace("{host}", host).replace("{id}", id).replace("{object-name}", encodeURIComponent(oname)).replace("{name}", aname).replace("{type}", type);
}