package com.github.angelndevil2.dseew.util;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.classic.util.ContextInitializer;
import ch.qos.logback.core.joran.spi.JoranException;
import lombok.Cleanup;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Properties;

/**
 * @author k, Created on 16. 1. 30.
 */
@Slf4j
public class PropertiesUtil {

    public static final String LogbackConfig = "logback.xml";
    public static final String AppProperties = "app.properties";
    @Setter @Getter
    private static String baseDir;
    @Setter @Getter
    private static String confDir;
    @Setter @Getter
    private static String binDir;
    @Setter @Getter
    private static String webBaseDir;
    public static final String JettyProperties = "jetty.properties";
    @Getter
    private static final Properties properties = new Properties();

    /**
     * load application's configuration
     * @throws IOException
     */
    private static void loadProperties() throws IOException {
        @Cleanup FileInputStream is = new FileInputStream(confDir + File.separator + AppProperties);
        properties.load(is);
    }

    /**
     * load logback configuration
     */
    private static void loadLogbackConfiguration() {
        System.setProperty("logback.configurationFile", confDir+File.separator+LogbackConfig);
        reloadLogger();
    }

    /**
     * @return
     */
    public static String getJettyPropertiesFile() { return confDir+File.separator+JettyProperties; }

    /**
     * set application's proper directory from base directory
     *
     * @throws IOException
     */
    private static void setDirs() throws IOException {
        if (baseDir == null) baseDir = ".";
        confDir = baseDir+File.separator+"conf";
        binDir = baseDir+File.separator+"bin";
        webBaseDir = baseDir+File.separator+"static_web";

        loadProperties();
        setHomeDir(baseDir);
        if (Boolean.valueOf(properties.getProperty("logback.use"))) loadLogbackConfiguration();
    }

    /**
     * set "universal-jvm-agent.home" system property
     *
     * @param dir
     */
    public static void setHomeDir(String dir) {
        System.setProperty("dsee.home", dir);
    }

    public static void setDirs(@NonNull String bd) throws IOException {
        baseDir = bd;
        setDirs();
    }

    public static void reloadLogger() {
        LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();

        ContextInitializer ci = new ContextInitializer(loggerContext);
        URL url = ci.findURLOfDefaultConfigurationFile(true);

        try {
            JoranConfigurator configurator = new JoranConfigurator();
            configurator.setContext(loggerContext);
            loggerContext.reset();
            configurator.doConfigure(url);
        } catch (JoranException je) {
            // StatusPrinter will handle this
        }
        //StatusPrinter.printInCaseOfErrorsOrWarnings(loggerContext);
    }

}
