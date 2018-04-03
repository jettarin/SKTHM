angular.module('myApp').config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when("/abnormal-demand-review", {templateUrl: _.toHttpGetUrl("content/abnormal-demand/review-campaign.html"), controller: AbnormalDemandReviewCtrl});
	$routeProvider.when("/abnormal-item-list/:division/:bu/:mediaType/:campaignId", {templateUrl: _.toHttpGetUrl("content/abnormal-demand/item-list.html"), controller: AbnormalItemListCtrl});
	$routeProvider.when("/abnormal-item-detail/:articleCode", {templateUrl: _.toHttpGetUrl("content/abnormal-demand/item-detail.html"), controller: AbnormalItemDetailCtrl});
	$routeProvider.when("/abnormal-item-history-allocation", {templateUrl: _.toHttpGetUrl("content/abnormal-demand/item-history-allocation.html"), controller: AbnormalItemHistoryCtrl});
} ]);


//####################### ABNORMAL REVIEW CAMPAIGN ##################
function AbnormalDemandReviewCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $log) {
	$log.info('ENTER ABNORMAL REVIEW CAMPAIGN');
	
	$timeout(function() {

		$scope.reviewCampaign = {};
	
		$scope.lookupDiv = [
       		{"divCode":"01", "divName":"Hard Line", "perImpact":""},
       		{"divCode":"02", "divName":"Home Line", "perImpact":""},
       		{"divCode":"03", "divName":"Dry Food", "perImpact":""},
       		{"divCode":"04", "divName":"Soft Line", "perImpact":""}
       	];
		
		$scope.lookupBu = [
			 {"buCode":"1", "buName":"Hyper"}
			,{"buCode":"2", "buName":"Market"}
			,{"buCode":"3", "buName":"Mini"}
			,{"buCode":"4", "buName":"Jumbo"}
		];
		
		$scope.lookupMediaType = [
			 {"mediaTypeCode":"1", "mediaTypeName":"Brochure"}
			,{"mediaTypeCode":"2", "mediaTypeName":"Catalog"}
			,{"mediaTypeCode":"3", "mediaTypeName":"Newspaper"}
			,{"mediaTypeCode":"4", "mediaTypeName":"Non-Media"}
			,{"mediaTypeCode":"5", "mediaTypeName":"Special Bro"}
			,{"mediaTypeCode":"6", "mediaTypeName":"TV"}
			,{"mediaTypeCode":"7", "mediaTypeName":"TVC"}
		];
		
		$scope.campaignList = [
			 {"campaignId":"C12BRA5607", "campaignName":"TVC-4-Dec-12", "startDate":"XX/12/2013", "endDate":"YY/12/2013", "medaiType":"Non-Media", "division":"04 DRY FOOD", "promotionId":"PS13014309", "promotionItem":"ชุดของขวัญเด็ก ลด 15%", "status":"New" }			
			,{"campaignId":"C12BRR4811", "campaignName":"TVC-4-Dec-12", "startDate":"XX/12/2013", "endDate":"YY/12/2013", "medaiType":"Non-Media", "division":"04 DRY FOOD", "promotionId":"PS13014805", "promotionItem":"(Micro B.26)ชุดของขวัญสำหรับเด็ก เบบี้มายด์ คัสสัน ดีนี่ J&J ลด10%", "status":"New" }
			,{"campaignId":"C12BRR4812", "campaignName":"TVC-4-Dec-12", "startDate":"XX/12/2013", "endDate":"YY/12/2013", "medaiType":"Non-Media", "division":"04 DRY FOOD", "promotionId":"PL12066137", "promotionItem":"ของใช้สำหรับเด็ก Pur   BayBee   Mother mind  อ่างอาบน้ำ และ กระโถน  ลด15%", "status":"New" }
			,{"campaignId":"C12BRR4812", "campaignName":"TVC-4-Dec-12", "startDate":"XX/12/2013", "endDate":"YY/12/2013", "medaiType":"Non-Media", "division":"04 DRY FOOD", "promotionId":"PS13015183", "promotionItem":"น้ำยาปรับผ้านุ่ม เบบี้มาย 700 มล ถุงเติม", "status":"New" }
			,{"campaignId":"C12BRR4812", "campaignName":"TVC-4-Dec-12", "startDate":"XX/12/2013", "endDate":"YY/12/2013", "medaiType":"Non-Media", "division":"04 DRY FOOD", "promotionId":"PL12061168", "promotionItem":"เบญจรงค์ข้าวขาวหอมมะลิ", "status":"New" }
		];
					  
		var tbody = "";
		_.each($scope.campaignList, function(campaign, index){
			tbody += '<tr ng-dblclick="gotoItemList('+ campaign.campaignId +')">';
			tbody += '<td>'+ (index+1) +'</td>';
			tbody += '<td>'+ campaign.campaignId +'</td>';
			tbody += '<td>'+ campaign.campaignName +'</td>';
			tbody += '<td>'+ campaign.medaiType +'</td>';
			tbody += '<td>'+ campaign.promotionId +'</td>';
			tbody += '<td>'+ campaign.promotionItem +'</td>';
			tbody += '<td>'+ campaign.division +'</td>';
			tbody += '<td>'+ campaign.startDate +'</td>';
			tbody += '<td>'+ campaign.endDate +'</td>';
			tbody += '<td>'+ campaign.status +'</td>';
			tbody += '<td class="action">';
//			tbody += '	<a  class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Edit")+'" href="#/abnormal-item-list/{{reviewCampaign.divCode}}/{{reviewCampaign.buCode}}/{{reviewCampaign.mediaTypeCode}}/'+ campaign.campaignId +'"><i class="icon-edit"></i></a>';
			tbody += '	<a  class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Edit")+'" href="" ng-click="gotoItemList('+ campaign.campaignId +')"><i class="icon-edit"></i></a>';
			tbody += '</td>';
			tbody += '</tr>';
		});
	
		$("#campaign_table").dataTable().fnClearTable();
		$('#campaign_table_tbody').append($compile(tbody)($scope));
		$("#campaign_table").dataTable({
			"bDestroy": true,
			"oLanguage": $rootScope.app.oLanguage(),
			"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
			"aoColumns": [
				{ "sWidth": "25px", "sClass": "text-center" },
				{ "sWidth": "60px", "sClass": "text-center" },
				{ "sWidth": "100px", "sClass": "text-left" },
				{ "sWidth": "80px", "sClass": "text-center" },
				{ "sWidth": "60px", "sClass": "text-left" },
				{ "sWidth": "150px", "sClass": "text-left" },
				{ "sWidth": "60px", "sClass": "text-left" },
				{ "sWidth": "60px", "sClass": "text-center" },
				{ "sWidth": "60px", "sClass": "text-center" },
				{ "sWidth": "40px", "sClass": "text-center" },
				{ "sWidth": "20px", "sClass": "text-center", "bSortable": false}
			]
		});
		$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
		
		$scope.gotoItemList = function(campaignId) {
			$location.path('abnormal-item-list/'+ $scope.reviewCampaign.divCode +'/'+ $scope.reviewCampaign.buCode +'/'+ $scope.reviewCampaign.mediaTypeCode +'/'+ campaignId);
		};
		
	}, 0);
	
};

//####################### ABNORMAL ITEM LIST ##################
function AbnormalItemListCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $routeParams) {
	
	$timeout(function() {

		$scope.campaignObj = {"campaignId":"C12BRA5607 TVC-4-Dec-12" ,"campaignName":"C12BRA5607 TVC-4-Dec-12", "startDate":1387738699000, "endDate":1387788999000, "promotionId":"PS13014309", "promotionItem":"(Micro B.26)ชุดของขวัญสำหรับเด็ก เบบี้มายด์ คัสสัน ดีนี่ J&J ลด10%" };
		
		$scope.brandList = [
			 {"brandId":"1", "brandName":"BABY MILD"}
			,{"brandId":"2", "brandName":"IVS"}
			,{"brandId":"3", "brandName":"BABI  MILD"}
			,{"brandId":"4", "brandName":"RS"}
			,{"brandId":"5", "brandName":"IVS"}
			,{"brandId":"6", "brandName":"BENJARONG"}
			,{"brandId":"7", "brandName":"IMP LOCAL"}
			,{"brandId":"8", "brandName":"WHISKAS"}
			,{"brandId":"9", "brandName":"PEDIASURE"}
			,{"brandId":"10", "brandName":"AIR WICK"}
			,{"brandId":"11", "brandName":"SCOTT"}
			,{"brandId":"12", "brandName":"OTHER"}
		];
		
		$scope.supplierList = [
			 {"supplierId":"1", "supplierName":"สหพัฒนพิบูล บมจ."}
			,{"supplierId":"2", "supplierName":"ซีโน-แปซิฟิค เทรดดิ้ง "}
			,{"supplierId":"3", "supplierName":"มอจ์ยี่ เอเชีย บจก.PLM"}
			,{"supplierId":"4", "supplierName":"ซีโน-แปซิฟิคเทรดดิ้ง(ไทยแลนด์) บจก."}
			,{"supplierId":"5", "supplierName":"ไดโซ (ประเทศไทย) บจก."}
			,{"supplierId":"6", "supplierName":"ซี.พี.คอนซูเมอร์ โพรดักส บจก."}
			,{"supplierId":"7", "supplierName":"เอชดี ดิสทริบิวเตอร์ส(ปทท)"}
			,{"supplierId":"8", "supplierName":"อีสท์เวสท์เทรดดิ้งแอนด์เอเย่นซีบจก."}
			,{"supplierId":"9", "supplierName":"มอคโคน่า (ประเทศไทย) บจก."}
			,{"supplierId":"10", "supplierName":"ยูนิลีเวอร์ ไทย เทรดดิ้ง บจก."}
			,{"supplierId":"11", "supplierName":"พี.เอส.บี (บจก.)"}
			,{"supplierId":"12", "supplierName":"เมก้า ซีเล็คชั่น บจก"}
			,{"supplierId":"13", "supplierName":"เป๊ปซี่-โคล่า(ไทย)เทรดดิ้ง บจก"}
			,{"supplierId":"14", "supplierName":"เบอร์ลี่ยุคเกอร์บมจ."}
			,{"supplierId":"15", "supplierName":"พรอคเตอร์ แอนด์ แกมเบิล "}
			,{"supplierId":"16", "supplierName":"โวคลิฟวิ่ง บจก."}
		];
		
		$scope.statusList = [{"statusId":"R", "statusNameEn":"Reviewed", "statusNameLc":"รีวิว"}];
		
		$scope.abnormalList = [{"abnormalId":"Y", "abnormalNameEn":"Yes", "abnormalNameLc":"ใช่"}, {"abnormalId":"N", "abnormalNameEn":"No", "abnormalNameLc":"ไม่"}];
		
		$scope.articleList = [
			 {"articleCode":"100777218", "isOrder":true, "manualFlag":"", "externalCode":"100500540", "svCode":"0", "articleName":"ชุดกล่องของขวัยJ&J LARGE", "barcode":"8850007100041", "brand":"OTHER", "supplier":"จอห์นสัน แอนด์ จอห์นสัน คอนซู", "forcastQTY":"2,500", "abnormal":"", "status":"Reviewed" }
			,{"articleCode":"100810280", "isOrder":true, "manualFlag":"", "externalCode":"101383145", "svCode":"0", "articleName":"ชุดของขวัญคัสสัน", "barcode":"8850169590049", "brand":"OTHER", "supplier":"พีแซท คัสสัน (ปทท) บจก", "forcastQTY":"1,000", "abnormal":"ABN", "status":"Reviewed" }
			,{"articleCode":"100613695", "isOrder":true, "manualFlag":"", "externalCode":"100515492", "svCode":"0", "articleName":"BABY GIFTSET KODOMO LARGE", "barcode":"8850002907645", "brand":"IMP LOCAL", "supplier":"สหพัฒนพิบูล บมจ.", "forcastQTY":"2,000", "abnormal":"", "status":"" }
			,{"articleCode":"100810280", "isOrder":true, "manualFlag":"", "externalCode":"102174653", "svCode":"0", "articleName":"ชุดของขัวญเล็กเบบี้มายด์ชมพู", "barcode":"8850169590049", "brand":"GUYLIAN", "supplier":"พีแซท คัสสัน (ปทท) บจก", "forcastQTY":"30", "abnormal":"ABN", "status":"" }
			,{"articleCode":"100874618", "isOrder":true, "manualFlag":"M", "externalCode":"100544597", "svCode":"0", "articleName":"ชุดกล่องของขวัยJ&J LARGE", "barcode":"8851123345125", "brand":"BENJARONG", "supplier":"ไบโอ คอนซูเมอร์ บจก", "forcastQTY":"2,500", "abnormal":"ABN", "status":"" }
			,{"articleCode":"100874618", "isOrder":true, "manualFlag":"M", "externalCode":"102072747", "svCode":"0", "articleName":"BABY GIFTSET KODOMO SMALL", "barcode":"8851123345125", "brand":"MERCI", "supplier":"บริษัท แวลูวิชั่น จำกัด", "forcastQTY":"500", "abnormal":"ABN", "status":"Reviewed" }
			,{"articleCode":"100777218", "isOrder":true, "manualFlag":"", "externalCode":"100507624", "svCode":"0", "articleName":"ดีนี่ชุดของขวัญกล่องเล็ก", "barcode":"8850007100041", "brand":"SCOTT", "supplier":"อาร์.เอส.มาร์เก็ตติ้ง", "forcastQTY":"100", "abnormal":"", "status":"Reviewed" }
			,{"articleCode":"100613696", "isOrder":true, "manualFlag":"M", "externalCode":"100944771", "svCode":"0", "articleName":"GIFT BAG SMALL CUSSONS", "barcode":"8850002907638", "brand":"FERRERO", "supplier":"เอเชีย อินเตอร์ไรซ์ บจก.", "forcastQTY":"1,500", "abnormal":"", "status":"Reviewed" }
			,{"articleCode":"101064353", "isOrder":true, "manualFlag":"", "externalCode":"102150798", "svCode":"0", "articleName":"ยาสีฟันเด็กมิลค์ เอนไซม์", "barcode":"8851989060583", "brand":"OTHER", "supplier":"มาร์ส ไทยแลนด์ อิงค์", "forcastQTY":"300", "abnormal":"ABN", "status":"" }
			,{"articleCode":"100680677", "isOrder":true, "manualFlag":"", "externalCode":"100500541", "svCode":"0", "articleName":"ดีนี่ชุดของขวัญกล่องเล็ก", "barcode":"8850169590032", "brand":"OTHER", "supplier":"โวคลิฟวิ่ง บจก.", "forcastQTY":"4,000", "abnormal":"ABN", "status":"" }
			,{"articleCode":"102028434", "isOrder":true, "manualFlag":"", "externalCode":"100548124", "svCode":"0", "articleName":"GIFT BAG LARGE CUSSONS", "barcode":"8851697200011", "brand":"OTHER", "supplier":"ดีเคเอสเอช (ประเทศไทย)บจก.", "forcastQTY":"3,000", "abnormal":"", "status":"" }
			,{"articleCode":"101064353", "isOrder":true, "manualFlag":"", "externalCode":"102116790", "svCode":"0", "articleName":"วิสกัส 7 กก. รสปลาทูน่า", "barcode":"8851989060583", "brand":"OTHER", "supplier":"มอจ์ยี่ เอเชีย บจก.PLM", "forcastQTY":"1,000", "abnormal":"", "status":"" }
		];
		
		var tbody = "";
		_.each($scope.articleList, function(article, index){
		
			var img_manualFlag = '';
			if (article.manualFlag === 'M') {
				img_manualFlag = '<span class="label label-small label-warning arrowed-right tooltip-warning" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Manual")+'">M</span>';
			}
		
			var img_abnormal = '';
			if (article.abnormal === 'ABN') {
				img_abnormal = '<a class="red tooltip-error" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Abnormal Flag")+'" ><i class="icon-flag"></i></a>';
			}
			
			var img_review = '';
			if (article.status === 'Reviewed') {
				img_review = '<a class="green tooltip-success" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Reviewed")+'" ><i class="icon-eye-open"></i></a>';
			}
		
			tbody += '<tr ng-dblclick="document.location = \'#/abnormal-item-detail/'+ article.articleCode +'\';">';
			tbody += '<td>'+ (index+1) +'</td>';
			tbody += '<td><input type="checkbox" value="'+ article.isOrder +'" checked ><span class="lbl"></span></td>';
			tbody += '<td>'+ img_manualFlag +'</td>';
			tbody += '<td>'+ article.externalCode +'</td>';
			tbody += '<td>'+ article.svCode +'</td>';
			tbody += '<td>'+ article.articleName +'</td>';
			tbody += '<td>'+ article.barcode +'</td>';
			tbody += '<td>'+ article.brand +'</td>';
			tbody += '<td>'+ article.supplier +'</td>';
			tbody += '<td>'+ article.forcastQTY +'</td>';
			tbody += '<td>'+ img_abnormal +'</td>';
			tbody += '<td class="action">';
			tbody +=  img_review;
			tbody += '</td>';
			tbody += '<td class="action">';
			tbody += '	<a class="tooltip-info" tooltip-placement="top" tooltip="'+$scope.app.lang.convert("Edit")+'" href="#/abnormal-item-detail/'+ article.articleCode +'"><i class="icon-edit bigger-130"></i></a>';
			tbody += '</td>';
			tbody += '</tr>';
		});
	
		$("#article_table").dataTable().fnClearTable();
		$('#article_table_tbody').append($compile(tbody)($scope));
		$("#article_table").dataTable({
			"bDestroy": true,
			"oLanguage": $rootScope.app.oLanguage(),
			"sDom": "t<'row-fluid'<'span4'lf><'span4'i><'span4'p>>",
			"aoColumns": [
				{ "sWidth": "25px", "sClass": "text-center" },
				{ "sWidth": "20px", "sClass": "text-center" },
				{ "sWidth": "20px", "sClass": "text-center" },
				{ "sWidth": "45px", "sClass": "text-center" },
				{ "sWidth": "25px", "sClass": "text-center" },
				{ "sWidth": "100px", "sClass": "text-left" },
				{ "sWidth": "20px", "sClass": "text-center" },
				{ "sWidth": "50px", "sClass": "text-left" },
				{ "sWidth": "80px", "sClass": "text-left" },
				{ "sWidth": "20px", "sClass": "text-right" },
				{ "sWidth": "30px", "sClass": "text-center" },
				{ "sWidth": "20px", "sClass": "text-center" },
				{ "sWidth": "10px", "sClass": "text-center" , "bSortable": false}
			]
		});
		$('.dt_actions').html($compile($('.dt_app_actions').html())($scope));
		
		$scope.back = function() {
			$location.path('abnormal-demand-review');
		};
		
		$scope.save = function() {
			$scope.app.addAlert('gritter-success', 'Update Success', 100);
			$scope.back();
		};
		
	}, 0);
	
};

//####################### ABNORMAL ITEM DETAIL ##################
function AbnormalItemDetailCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $routeParams, $log) {
	
	$timeout(function() {
		
		$scope.dataDetail = {"articleCode":"101064353", "isOrder":false, "externalCode":"102116790", "svCode":"0", "articleName":"วิสกัส 7 กก. รสปลาทูน่า", "barcode":"8851989060583", "brand":"WHISKAS", "supplier":"มาร์ส ไทยแลนด์ อิงค์", "forcastQTY":"1,000", "abnormal":"", "status":"" };
		
		$scope.dataList = [
			 {"storeId":"11101", "storeCode":"11101", "storeShortName":"HHWSW1","storeName":"(สาขาวงศ์สว่าง)", "allot7_org":13.80, "allot7":"13.80", "allot7_re":14.70, "qty":1467, "amt":28881}
			,{"storeId":"11102", "storeCode":"11102", "storeShortName":"HHCWT1","storeName":"(สาขาแจ้งวัฒนะ)", "allot7_org":20.60, "allot7":"20.60", "allot7_re":22.00, "qty":2201, "amt":43321}
			,{"storeId":"11103", "storeCode":"11103", "storeShortName":"HHRBR1","storeName":"(สาขาราษฏร์บูรณะ)", "allot7_org":34.40, "allot7":"30.00", "allot7_re":30.00, "qty":3000, "amt":62816, "notiMsg":"Business Unit: Hyper<br/>Division: Dry Food<br/>Time of average across stores = 5"}
			,{"storeId":"11104", "storeCode":"11104", "storeShortName":"HHPTY1","storeName":"(สาขาพัทยา)", "allot7_org":10.60, "allot7":"10.60", "allot7_re":11.30, "qty":1131, "amt":21661}
			,{"storeId":"11105", "storeCode":"11105", "storeShortName":"HHBPE1","storeName":"(สาขาบางพลี)", "allot7_org":20.60, "allot7":"20.60", "allot7_re":22.00, "qty":2201, "amt":43321}
		];
		
		$scope.back = function() {
			window.history.back();
		};
		
		$scope.save = function() {
			
			$scope.isSubmit = true;
			
			if ($scope.form.$invalid) {
				$scope.app.addAlert('gritter-error', 'Incorrect data !!!', 4000);
				return;
			}
			$scope.app.addAlert('gritter-success', 'Update Success', 100);
		};
	
	}, 0);
	
};

//####################### HITSORY ALLOCATION ##################
function AbnormalItemHistoryCtrl($rootScope, $scope, $http, $compile, $timeout, $filter, $location, $routeParams, $log) {
	$log.info('ENTER HITSORY ALLOCATION');
	
	$timeout(function() {
		
		$scope.campaignObj = {"campaignId":"C12BRA5607 TVC-4-Dec-12" ,"campaignName":"C12BRA5607 TVC-4-Dec-12", "startDate":1387738699000, "endDate":1387788999000, "promotionId":"PS13014309", "promotionItem":"(Micro B.26)ชุดของขวัญสำหรับเด็ก เบบี้มายด์ คัสสัน ดีนี่ J&J ลด10%" };
		$scope.itemObj = {"articleCode":"101064353", "isOrder":false, "externalCode":"102116790", "svCode":"0", "articleName":"วิสกัส 7 กก. รสปลาทูน่า", "barcode":"8851989060583", "brand":"WHISKAS", "supplier":"มาร์ส ไทยแลนด์ อิงค์", "forcastQTY":"1,000", "abnormal":"", "status":"" };
		
		// Table Head
		$scope.historyTableHeader = [
                {"storeCode":"11101", "isNewStore":false}
               ,{"storeCode":"11102", "isNewStore":false}
               ,{"storeCode":"11103", "isNewStore":false}
               ,{"storeCode":"11104", "isNewStore":false}
               ,{"storeCode":"11219", "isNewStore":true}
        ];
		
		// Table Body
		// Allot-1
		$scope.historyAllot1List = [
                {"name":"11WQty", "11101":"20", "11102":"30", "11103":"100", "11104":"0", "11219":"0", "sum":"150"}
              , {"name":"Allot-1", "11101":"13.33%", "11102":"20.00%", "11103":"66.67%", "11104":"00.00%", "11219":"0.00%", "sum":"100.00%"}
		];
		
		// Allot-2
		$scope.historyAllot2List = [
                {"name":"11WClassAmt (MB)", "11101":"5.00", "11102":"10.00", "11103":"90.00", "11104":"3.00", "11219":"0.00", "sum":"108.00"}
              , {"name":"Allot-2", "11101":"4.63%", "11102":"9.26%", "11103":"83.33%", "11104":"2.78%", "11219":"00.00%", "sum":"100.00%"}
		];
		
		// Allot-3
		$scope.historyAllot3List = [
                {"name":"Allot-3 before adj", "11101":"13.33%", "11102":"20.00%", "11103":"66.67%", "11104":"2.78%", "11219":"00.00%", "sum":"102.78%", "notiMsg":" "}
              , {"name":"Allot-3", "11101":"12.97%", "11102":"19.46%", "11103":"64.86%", "11104":"2.70%", "11219":"00.00%", "sum":"100.00%"}
		];
		
		// Allot-4
		$scope.historyAllot4List = [
                {"name":"Allot-4 before adj", "11101":"12.97%", "11102":"19.46%", "11103":"64.86%", "11104":"10.00%", "11219":"10.00%", "sum":"117.30%", "notiMsg":"% Minimum Allocate = 10%"}
              , {"name":"Allot-4", "11101":"11.06%", "11102":"16.59%", "11103":"55.30%", "11104":"8.53%", "11219":"8.53%", "sum":"100.00%"}
		];
		
		// Allot-5
		$scope.historyAllot5List = [
                {"name":"Allot-5 before adj", "11101":"11.06%", "11102":"16.59%", "11103":"55.30%", "11104":"8.53%", "11219":"16.59%", "sum":"108.06%", "notiMsg":"Division: Dry Food<br/>Model Store: 11102<br/>% of Model Store: 100"}
              , {"name":"Allot-5", "11101":"10.23%", "11102":"15.35%", "11103":"51.17%", "11104":"7.89%", "11219":"15.35%", "sum":"100.00%"}
		];
		
		// Allot-6
		$scope.historyAllot6List = [
                {"name":"Allot-6 before adj", "11101":"10.23%", "11102":"15.35%", "11103":"25.59%", "11104":"7.89%", "11219":"15.35%", "sum":"74.41%", "notiMsg":"LE001: Natural disaster - flooding (Negative) = 50.00%"}
              , {"name":"Allot-6", "11101":"14.00%", "11102":"21.00%", "11103":"34.00%", "11104":"11.00%", "11219":"21.00%", "sum":"100.00%"}
		];
		
		// Allot-7
		$scope.historyAllot7List = [
                {"name":"Allot-7 original", "11101":"13.80%", "11102":"20.60%", "11103":"34.40%", "11104":"10.60%", "11219":"20.6%", "sum":"100.00%", "notiMsg":"Business Unit: Hyper<br/>Division: Dry Food<br/>Time of average across stores = 5"}
		];
		
		$scope.back = function() {
			 window.history.back();
		};
	
	}, 0);
	
};

