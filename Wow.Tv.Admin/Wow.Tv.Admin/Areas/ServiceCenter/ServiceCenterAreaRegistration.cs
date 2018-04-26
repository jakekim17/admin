using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.ServiceCenter
{
    public class ServiceCenterAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "ServiceCenter";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "ServiceCenter_default",
                "ServiceCenter/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}