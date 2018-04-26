using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.BroadCast
{
    public class BroadCastAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "BroadCast";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "BroadCast_default",
                "BroadCast/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}