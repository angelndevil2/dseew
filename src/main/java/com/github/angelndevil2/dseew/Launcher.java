package com.github.angelndevil2.dseew;

import com.github.angelndevil2.dseew.jetty.JettyServer;
import com.github.angelndevil2.dseew.util.PropertiesUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.ParseException;

import java.io.File;
import java.io.IOException;

/**
 * @author k, Created on 16. 2. 21.
 */
@Slf4j
public class Launcher {

    private static String vmArgs;

    /**
     * for command line to attach this agent.
     *
     * @param args command line arguments
     */
    @SuppressWarnings("unchecked")
    public static void main(String[] args) throws IOException, ParseException {

        CmdOptions options = new CmdOptions();

        options.setArgs(args);

        CommandLine cmd = options.getCmd();
        if (cmd.hasOption('h')) {
            options.printUsage();
            return;
        }

        if (cmd.hasOption("d")) {
            try {

                PropertiesUtil.setDirs(cmd.getOptionValue("d").trim());

                vmArgs = cmd.getOptionValue("d").trim();

            } catch (IOException e) {

                System.err.println(PropertiesUtil.getConfDir() + File.separator + PropertiesUtil.AppProperties + " not found. may use -d option\n" + e);
                return;
            }
        }

        if (cmd.hasOption('s')) {
            new JettyServer().run();

        } else {
            System.out.println("s options is required");
            options.printUsage();
        }
    }
}
