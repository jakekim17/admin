using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.ProgramBoard
{
    public class ProgramBoardAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ProgramBoard";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "ProgramBoard_default",
                "ProgramBoard/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}