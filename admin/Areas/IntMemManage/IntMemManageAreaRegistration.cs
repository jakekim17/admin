using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.IntMemManage
{
    public class IntMemManageAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "IntMemManage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "IntMemManage_default",
                "IntMemManage/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}