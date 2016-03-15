package com.github.angelndevil2.dseew.servlet;

import com.github.angelndevil2.dseew.util.HttpClientUtil;

import javax.management.InstanceNotFoundException;
import javax.management.IntrospectionException;
import javax.management.MalformedObjectNameException;
import javax.management.ReflectionException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static com.google.common.base.Preconditions.checkArgument;

/**
 * @author k, Created on 16. 2. 28.
 */
@Path("/mbean-info/{host}/{id}/{object-name}")
public class MBeanInfo {

    /**
     *
     * @param id mbean server id
     * @param objectName object name
     * @return mbean info string
     * @throws InstanceNotFoundException
     * @throws IntrospectionException
     * @throws MalformedObjectNameException
     * @throws ReflectionException
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("unchecked")
    public Response getMBeanInfo(@PathParam("host") String host, @PathParam("id") String id, @PathParam("object-name") String objectName)
            throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);
        checkArgument(objectName != null);

        return Response.status(200).entity(HttpClientUtil.getMBeanInfo(host, id, objectName).toString()).build();
    }

    /**
     *
     * @param host
     * @param id
     * @param objectName
     * @return
     * @throws Exception
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @SuppressWarnings("unchecked")
    @Path("/attributes")
    public Response getAttributes(@PathParam("host") String host, @PathParam("id") String id, @PathParam("object-name") String objectName)
            throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);
        checkArgument(objectName != null);

        return Response.status(200).entity(HttpClientUtil.getMBeanAttributes(host, id, objectName).toJSONString()).build();
    }
}
