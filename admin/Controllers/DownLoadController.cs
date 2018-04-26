using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.Admin.Controllers
{
    public class DownLoadController : Controller
    {
        // GET: DownLoad
        public ActionResult Index(string realFilePath, string userUpLoadFileName)
        {
            System.IO.MemoryStream stream = new Wow.Fx.CdnUploadHandler().FtpDownLoad(realFilePath);
            return File(stream, "multipart/form-data", userUpLoadFileName);
        }

        public ActionResult Sample()
        {
            return View();
        }

        public ActionResult Sample2()
        {
            System.IO.MemoryStream stream = new Wow.Fx.CdnUploadHandler().FtpDownLoad("/Admin\\aaa.jpg");
            return File(stream, "multipart/form-data", "사용자업로드.jpg");
        }
    }
}