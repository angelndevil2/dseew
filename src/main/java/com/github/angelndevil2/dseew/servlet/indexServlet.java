package com.github.angelndevil2.dseew.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * <h3>For use with angularJs 2 HTML5 style url routing.</h3>
 * Suppose Angular2 routed urls served by index.html, this servlet will return index.html.
 *
 * @author k, Created on 16. 3. 9.
 */
public class indexServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        response.setStatus(HttpServletResponse.SC_OK);

        PrintWriter out = response.getWriter();
        ServletContext cntxt = this.getServletContext();
        String fName = "/index.html";
        InputStream ins = cntxt.getResourceAsStream(fName);
        try {
            if (ins != null) {
                InputStreamReader isr = new InputStreamReader(ins);
                BufferedReader reader = new BufferedReader(isr);
                String word;
                while ((word = reader.readLine()) != null) {
                    out.println(word);
                }
            }
        }finally {
            out.close();
        }
    }
}
