﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.HolidayTimeMngService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="HolidayTimeMngService.IHolidayTimeMngService")]
    public interface IHolidayTimeMngService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/GetList", ReplyAction="http://tempuri.org/IHolidayTimeMngService/GetListResponse")]
        Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME> GetList(Wow.Tv.Middle.Model.Db22.stock.Admin.HolidayMngCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/GetList", ReplyAction="http://tempuri.org/IHolidayTimeMngService/GetListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME>> GetListAsync(Wow.Tv.Middle.Model.Db22.stock.Admin.HolidayMngCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/DateConfirm", ReplyAction="http://tempuri.org/IHolidayTimeMngService/DateConfirmResponse")]
        bool DateConfirm(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/DateConfirm", ReplyAction="http://tempuri.org/IHolidayTimeMngService/DateConfirmResponse")]
        System.Threading.Tasks.Task<bool> DateConfirmAsync(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/SaveTime", ReplyAction="http://tempuri.org/IHolidayTimeMngService/SaveTimeResponse")]
        int SaveTime(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/SaveTime", ReplyAction="http://tempuri.org/IHolidayTimeMngService/SaveTimeResponse")]
        System.Threading.Tasks.Task<int> SaveTimeAsync(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/SaveMaster", ReplyAction="http://tempuri.org/IHolidayTimeMngService/SaveMasterResponse")]
        int SaveMaster(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/SaveMaster", ReplyAction="http://tempuri.org/IHolidayTimeMngService/SaveMasterResponse")]
        System.Threading.Tasks.Task<int> SaveMasterAsync(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/Delete", ReplyAction="http://tempuri.org/IHolidayTimeMngService/DeleteResponse")]
        void Delete(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/Delete", ReplyAction="http://tempuri.org/IHolidayTimeMngService/DeleteResponse")]
        System.Threading.Tasks.Task DeleteAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/GetTimeData", ReplyAction="http://tempuri.org/IHolidayTimeMngService/GetTimeDataResponse")]
        Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME GetTimeData(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/GetTimeData", ReplyAction="http://tempuri.org/IHolidayTimeMngService/GetTimeDataResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME> GetTimeDataAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/GetMasterData", ReplyAction="http://tempuri.org/IHolidayTimeMngService/GetMasterDataResponse")]
        Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER GetMasterData();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IHolidayTimeMngService/GetMasterData", ReplyAction="http://tempuri.org/IHolidayTimeMngService/GetMasterDataResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER> GetMasterDataAsync();
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IHolidayTimeMngServiceChannel : Wow.Tv.Admin.HolidayTimeMngService.IHolidayTimeMngService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class HolidayTimeMngServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.HolidayTimeMngService.IHolidayTimeMngService>, Wow.Tv.Admin.HolidayTimeMngService.IHolidayTimeMngService {
        
        public HolidayTimeMngServiceClient() {
        }
        
        public HolidayTimeMngServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public HolidayTimeMngServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public HolidayTimeMngServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public HolidayTimeMngServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME> GetList(Wow.Tv.Middle.Model.Db22.stock.Admin.HolidayMngCondition condition) {
            return base.Channel.GetList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Common.ListModel<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME>> GetListAsync(Wow.Tv.Middle.Model.Db22.stock.Admin.HolidayMngCondition condition) {
            return base.Channel.GetListAsync(condition);
        }
        
        public bool DateConfirm(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model) {
            return base.Channel.DateConfirm(model);
        }
        
        public System.Threading.Tasks.Task<bool> DateConfirmAsync(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model) {
            return base.Channel.DateConfirmAsync(model);
        }
        
        public int SaveTime(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveTime(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveTimeAsync(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveTimeAsync(model, loginUser);
        }
        
        public int SaveMaster(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveMaster(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveMasterAsync(Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveMasterAsync(model, loginUser);
        }
        
        public void Delete(int seq) {
            base.Channel.Delete(seq);
        }
        
        public System.Threading.Tasks.Task DeleteAsync(int seq) {
            return base.Channel.DeleteAsync(seq);
        }
        
        public Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME GetTimeData(int seq) {
            return base.Channel.GetTimeData(seq);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_TIME> GetTimeDataAsync(int seq) {
            return base.Channel.GetTimeDataAsync(seq);
        }
        
        public Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER GetMasterData() {
            return base.Channel.GetMasterData();
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db22.stock.NTB_SISE_MASTER> GetMasterDataAsync() {
            return base.Channel.GetMasterDataAsync();
        }
    }
}
