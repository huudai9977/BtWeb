using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class DemoLocalAPIController : ApiController
    {
        [HttpGet]
        [ActionName("GetData")]
        public HttpResponseMessage GetData(string key, string status, int index, string where)
        {
            List<string> AuthorList = new List<string>();
            AuthorList.Add("Mahesh Chand");
            AuthorList.Add("Praveen Kumar");
            AuthorList.Add("Raj Kumar");
            AuthorList.Add("Nipun Tomar");
            AuthorList.Add("Dinesh Beniwal");
            return Request.CreateResponse(HttpStatusCode.OK, AuthorList);
        }
    }
}
