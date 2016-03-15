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
@Path("/domains/{host}/{id}")
public class MBeanDomains {
    /**
     * @param id mbean server id
     * @return mbean domains
     * @throws Exception
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDomains(@PathParam("host") String host, @PathParam("id") String id) throws Exception {

        checkArgument(host != null);
        checkArgument(id != null);

        return Response.status(200).entity(HttpClientUtil.getMBeanDomains(host, id).toJSONString()).build();
    }
}
