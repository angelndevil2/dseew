package com.github.angelndevil2.dseew.servlet;

import com.github.angelndevil2.dseew.util.HttpClientUtil;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * @author k, Created on 16. 3. 2.
 */
@Path("/mbean-servers/{host}")
public class MBeanServers {
    @Context
    private HttpServletRequest httpRequest;

    /**
     *
     * @return mbean server id
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getIds(@PathParam("host") String host) throws Exception {

        checkArgument(host != null);

        return Response.status(200).entity(HttpClientUtil.getMBeanServers(host).toJSONString()).build();
    }

}
