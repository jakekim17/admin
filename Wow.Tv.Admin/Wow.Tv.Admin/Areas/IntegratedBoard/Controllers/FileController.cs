using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.IntegratedBoard.Controllers
{
    public class FileController : BaseController
    {
        public FileResult Download(string realFilePath, string downloadFilename)
        {
            System.IO.MemoryStream stream = new Wow.Fx.CdnUploadHandler().FtpDownLoad(realFilePath);
            return File(stream, "multipart/form-data", downloadFilename);
        }
    }
}