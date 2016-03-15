package com.github.angelndevil2.dseew.servlet;

import com.github.angelndevil2.dseew.util.HttpClientUtil;

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
@Path("/mbean/{host}/{id}/{object-name}")
public class MBean {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("unchecked")
    @Path("/attribute/{name}")
    public Response getAttribute(
                                 @PathParam("host") String host,
                                 @PathParam("id") String id,
                                 @PathParam("object-name") String objectName,
                                 @PathParam("name") String name)
            throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);
        checkArgument(objectName != null);
        checkArgument(name != null);

        return Response.status(200).entity(HttpClientUtil.getMBeanAttribute(host, id, objectName, name)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("unchecked")
    @Path("/attribute/{name}/{type}")
    public Response getAttribute(
            @PathParam("host") String host,
            @PathParam("id") String id,
            @PathParam("object-name") String objectName,
            @PathParam("name") String name,
            @PathParam("type") String type)
            throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);
        checkArgument(objectName != null);
        checkArgument(name != null);
        checkArgument(type != null);

        return Response.status(200).entity(HttpClientUtil.getMBeanAttribute(host, id, objectName, name, type)).build();
    }
}
