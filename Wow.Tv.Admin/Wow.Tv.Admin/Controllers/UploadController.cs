using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.Admin.Controllers
{
    public class UploadController : BaseController
    {
        public ActionResult EditorFileUpload()
        {
            Debug.WriteLine("Message is written");
            string imageUrl = "";
            string url = System.Configuration.ConfigurationManager.AppSettings["WowTvScript"];
            string redirectUrl = url  + "/SE2/photo_uploader/popup/callback.html?callback_func=" + Request["callback_func"];
            string uploadPath = System.Configuration.ConfigurationManager.AppSettings["UploadPath"];
            string uploadWebPath = System.Configuration.ConfigurationManager.AppSettings["UploadWebPath"];
            
            try
            {
                var file = Request.Files[0]; 
                string fileName = DateTime.Now.ToFileTime().ToString() + System.IO.Path.GetExtension(file.FileName);

                imageUrl = uploadWebPath + "/Editor/" + fileName;
                uploadPath = uploadPath + "\\Editor\\";

                new Wow.Fx.CdnUploadHandler().FtpUpLoad(uploadPath, fileName, file.InputStream);

                redirectUrl = redirectUrl + "&bNewLine=true&sFileName=" + file.FileName + "&sFileURL=" + imageUrl;
            }
            catch (Exception e)
            {
                redirectUrl = redirectUrl + "&errstr=error";
            }
            
            return Redirect(redirectUrl);
        }
    }
}