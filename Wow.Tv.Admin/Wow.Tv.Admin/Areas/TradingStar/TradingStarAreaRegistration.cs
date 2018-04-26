using System.Web.Mvc;

namespace Wow.Tv.Admin.Areas.TradingStar
{
    public class TradingStarAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "TradingStar";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "TradingStar_default",
                "TradingStar/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}