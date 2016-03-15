package com.github.angelndevil2.dseew.servlet;

import com.github.angelndevil2.dseew.util.HttpClientUtil;

import javax.management.InstanceNotFoundException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * @author k, Created on 16. 3. 2.
 */
@Path("/mbeans/{host}/{id}")
public class MBeans {
    /**
     *
     * @param id mbean server id
     * @return objects's ObjectName.toString() of mbean server
     * @throws InstanceNotFoundException
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMBeanNames(@PathParam("host") String host, @PathParam("id") String id)
            throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);

        return Response.status(200).entity(HttpClientUtil.getMBeans(host, id).toJSONString()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{domain}")
    public Response getMBeanNames(@PathParam("host") String host, @PathParam("id") String id, @PathParam("domain") String domain)
            throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);
        checkArgument(domain != null);


        return Response.status(200).entity(HttpClientUtil.getMBeans(host, id, domain).toJSONString()).build();
    }

}
