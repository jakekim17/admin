﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.BalanceService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="BalanceService.IBalanceService")]
    public interface IBalanceService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/GetList", ReplyAction="http://tempuri.org/IBalanceService/GetListResponse")]
        Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS> GetList(Wow.Tv.Middle.Model.Db51.contents.Balance.BalanceCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/GetList", ReplyAction="http://tempuri.org/IBalanceService/GetListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS>> GetListAsync(Wow.Tv.Middle.Model.Db51.contents.Balance.BalanceCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/Delete", ReplyAction="http://tempuri.org/IBalanceService/DeleteResponse")]
        void Delete(int[] deleteList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/Delete", ReplyAction="http://tempuri.org/IBalanceService/DeleteResponse")]
        System.Threading.Tasks.Task DeleteAsync(int[] deleteList);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/Save", ReplyAction="http://tempuri.org/IBalanceService/SaveResponse")]
        int Save(Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/Save", ReplyAction="http://tempuri.org/IBalanceService/SaveResponse")]
        System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/GetData", ReplyAction="http://tempuri.org/IBalanceService/GetDataResponse")]
        Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS GetData(int no);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/GetData", ReplyAction="http://tempuri.org/IBalanceService/GetDataResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS> GetDataAsync(int no);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/GetFrontData", ReplyAction="http://tempuri.org/IBalanceService/GetFrontDataResponse")]
        Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS> GetFrontData(string year);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IBalanceService/GetFrontData", ReplyAction="http://tempuri.org/IBalanceService/GetFrontDataResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS>> GetFrontDataAsync(string year);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IBalanceServiceChannel : Wow.Tv.Admin.BalanceService.IBalanceService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class BalanceServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.BalanceService.IBalanceService>, Wow.Tv.Admin.BalanceService.IBalanceService {
        
        public BalanceServiceClient() {
        }
        
        public BalanceServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public BalanceServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BalanceServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public BalanceServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS> GetList(Wow.Tv.Middle.Model.Db51.contents.Balance.BalanceCondition condition) {
            return base.Channel.GetList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS>> GetListAsync(Wow.Tv.Middle.Model.Db51.contents.Balance.BalanceCondition condition) {
            return base.Channel.GetListAsync(condition);
        }
        
        public void Delete(int[] deleteList) {
            base.Channel.Delete(deleteList);
        }
        
        public System.Threading.Tasks.Task DeleteAsync(int[] deleteList) {
            return base.Channel.DeleteAsync(deleteList);
        }
        
        public int Save(Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.Save(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveAsync(model, loginUser);
        }
        
        public Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS GetData(int no) {
            return base.Channel.GetData(no);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS> GetDataAsync(int no) {
            return base.Channel.GetDataAsync(no);
        }
        
        public Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS> GetFrontData(string year) {
            return base.Channel.GetFrontData(year);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db51.contents.BalanceModel<Wow.Tv.Middle.Model.Db51.contents.NTB_FINANCE_STATUS>> GetFrontDataAsync(string year) {
            return base.Channel.GetFrontDataAsync(year);
        }
    }
}