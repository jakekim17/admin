﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.ProgramIntroService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="ProgramIntroService.IProgramIntroService")]
    public interface IProgramIntroService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IProgramIntroService/GetAt", ReplyAction="http://tempuri.org/IProgramIntroService/GetAtResponse")]
        Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO GetAt(string programCode);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IProgramIntroService/GetAt", ReplyAction="http://tempuri.org/IProgramIntroService/GetAtResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO> GetAtAsync(string programCode);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IProgramIntroService/Save", ReplyAction="http://tempuri.org/IProgramIntroService/SaveResponse")]
        int Save(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IProgramIntroService/Save", ReplyAction="http://tempuri.org/IProgramIntroService/SaveResponse")]
        System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO model, Wow.Tv.Middle.Model.Common.LoginUser loginUser);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IProgramIntroServiceChannel : Wow.Tv.Admin.ProgramIntroService.IProgramIntroService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class ProgramIntroServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.ProgramIntroService.IProgramIntroService>, Wow.Tv.Admin.ProgramIntroService.IProgramIntroService {
        
        public ProgramIntroServiceClient() {
        }
        
        public ProgramIntroServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public ProgramIntroServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ProgramIntroServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public ProgramIntroServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO GetAt(string programCode) {
            return base.Channel.GetAt(programCode);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO> GetAtAsync(string programCode) {
            return base.Channel.GetAtAsync(programCode);
        }
        
        public int Save(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.Save(model, loginUser);
        }
        
        public System.Threading.Tasks.Task<int> SaveAsync(Wow.Tv.Middle.Model.Db49.wowtv.NTB_PROGRAM_INTRO model, Wow.Tv.Middle.Model.Common.LoginUser loginUser) {
            return base.Channel.SaveAsync(model, loginUser);
        }
    }
}