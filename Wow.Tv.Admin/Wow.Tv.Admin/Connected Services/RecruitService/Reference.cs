﻿//------------------------------------------------------------------------------
// <auto-generated>
//     이 코드는 도구를 사용하여 생성되었습니다.
//     런타임 버전:4.0.30319.42000
//
//     파일 내용을 변경하면 잘못된 동작이 발생할 수 있으며, 코드를 다시 생성하면
//     이러한 변경 내용이 손실됩니다.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Wow.Tv.Admin.RecruitService {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="RecruitService.IRecruitService")]
    public interface IRecruitService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/SearchList", ReplyAction="http://tempuri.org/IRecruitService/SearchListResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result[] SearchList(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/SearchList", ReplyAction="http://tempuri.org/IRecruitService/SearchListResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result[]> SearchListAsync(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/GetApplicantInfo", ReplyAction="http://tempuri.org/IRecruitService/GetApplicantInfoResponse")]
        Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result GetApplicantInfo(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/GetApplicantInfo", ReplyAction="http://tempuri.org/IRecruitService/GetApplicantInfoResponse")]
        System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result> GetApplicantInfoAsync(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/IncreaseViewCnt", ReplyAction="http://tempuri.org/IRecruitService/IncreaseViewCntResponse")]
        void IncreaseViewCnt(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/IncreaseViewCnt", ReplyAction="http://tempuri.org/IRecruitService/IncreaseViewCntResponse")]
        System.Threading.Tasks.Task IncreaseViewCntAsync(int seq);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/SaveRecruit", ReplyAction="http://tempuri.org/IRecruitService/SaveRecruitResponse")]
        void SaveRecruit(Wow.Tv.Middle.Model.Db89.wowbill.tblRecruit model);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IRecruitService/SaveRecruit", ReplyAction="http://tempuri.org/IRecruitService/SaveRecruitResponse")]
        System.Threading.Tasks.Task SaveRecruitAsync(Wow.Tv.Middle.Model.Db89.wowbill.tblRecruit model);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IRecruitServiceChannel : Wow.Tv.Admin.RecruitService.IRecruitService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class RecruitServiceClient : System.ServiceModel.ClientBase<Wow.Tv.Admin.RecruitService.IRecruitService>, Wow.Tv.Admin.RecruitService.IRecruitService {
        
        public RecruitServiceClient() {
        }
        
        public RecruitServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public RecruitServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public RecruitServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public RecruitServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result[] SearchList(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition) {
            return base.Channel.SearchList(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result[]> SearchListAsync(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition) {
            return base.Channel.SearchListAsync(condition);
        }
        
        public Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result GetApplicantInfo(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition) {
            return base.Channel.GetApplicantInfo(condition);
        }
        
        public System.Threading.Tasks.Task<Wow.Tv.Middle.Model.Db89.wowbill.NUP_RECRUIT_SELECT_Result> GetApplicantInfoAsync(Wow.Tv.Middle.Model.Db89.wowbill.Recruit.RecruitCondition condition) {
            return base.Channel.GetApplicantInfoAsync(condition);
        }
        
        public void IncreaseViewCnt(int seq) {
            base.Channel.IncreaseViewCnt(seq);
        }
        
        public System.Threading.Tasks.Task IncreaseViewCntAsync(int seq) {
            return base.Channel.IncreaseViewCntAsync(seq);
        }
        
        public void SaveRecruit(Wow.Tv.Middle.Model.Db89.wowbill.tblRecruit model) {
            base.Channel.SaveRecruit(model);
        }
        
        public System.Threading.Tasks.Task SaveRecruitAsync(Wow.Tv.Middle.Model.Db89.wowbill.tblRecruit model) {
            return base.Channel.SaveRecruitAsync(model);
        }
    }
}
