using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.MyBroadProgram
{
    public class MyBroadProgramAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "MyBroadProgram";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "MyBroadProgram_default",
                "MyBroadProgram/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}