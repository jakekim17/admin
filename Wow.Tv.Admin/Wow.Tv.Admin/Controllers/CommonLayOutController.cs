using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.Admin.Controllers
{
    public class CommonLayOutController : BaseController
    {
        // GET: CommonLayOut
        public ActionResult Header()
        {
            return View();
        }

        public ActionResult Left()
        {
            return View();
        }


        public ActionResult PageHeader()
        {
            return View();
        }
    }
}