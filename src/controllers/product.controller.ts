import { NextFunction, Request, Response, Router } from "express";
import Controller from "interfaces/controller.interface";
import axios from "axios";
import productModel from "models/product.model";
import ProductDto from "dto/product.dto";

class ProductController implements Controller {
  public path = "/product"
  public router = Router()
  public product = productModel

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/dump/:page`, this.dumpData)
    this.router.get(`${this.path}`, this.getProducts)
  }
  private getProducts = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
		const data = await this.product.find();
		response.send(data)
  }

  private dumpData = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const page = request.params["page"]
    console.log("pahge", page)
    var data = `{\r\n    "ordby": "pop",\r\n    "limit": 36,\r\n    "page": ${page},\r\n    "filter": "{}",\r\n    "supplierId": 85979793,\r\n    "applyfilter": true,\r\n    "themeId": 53430885,\r\n    "outletInfo": [\r\n        "JD63a34311498e35ffa7e1b1fa",\r\n        "JD63a34311498e35ffa7e1b1fb",\r\n        "zxygrocery",\r\n        "Aghadi Nagar-Andheri East",\r\n        "Mumbai",\r\n        "9967374668",\r\n        null\r\n    ],\r\n    "pageName": "listing",\r\n    "supplierType": "OMNISTANDARD",\r\n    "outletDetails": {\r\n        "account_mongo_id": "JD63a34311498e35ffa7e1b1fb",\r\n        "appLink": "",\r\n        "isplaystorelink": "",\r\n        "storeId": "zxygroceryshopping",\r\n        "notificationNumber": [\r\n            "9967374668"\r\n        ],\r\n        "notificationEmail": [\r\n            "jaiswarsandeep119@gmail.com"\r\n        ],\r\n        "showLeftMenu": 0,\r\n        "showFeaturedProduct": 0,\r\n        "showFeaturedMrp": 0,\r\n        "showFeaturedCategory": 1,\r\n        "isallowcod": true,\r\n        "isAllowPayPal": false,\r\n        "isEmailMandatoryForOnlineOrder": false,\r\n        "isMobileMandatoryForEnquiry": true,\r\n        "isEmailMandatoryForEnquiry": false,\r\n        "isCartAddButtonEnabled": false,\r\n        "deliveryCharges": 0,\r\n        "isCaptureGstinOnline": false,\r\n        "hideStickyFooterText": true,\r\n        "customCheckoutMsg": "",\r\n        "isEnabledOnlinePayment": true,\r\n        "onlinePaymentMode": "jdpay",\r\n        "isDemo": 1,\r\n        "outletid": "JD63a34311498e35ffa7e1b1fa",\r\n        "outletname": "zxygrocery",\r\n        "address": "",\r\n        "city": "Mumbai",\r\n        "pincode": "400093",\r\n        "state": "Maharashtra",\r\n        "email": "jaiswarsandeep119@gmail.com",\r\n        "area": "Aghadi Nagar-Andheri East",\r\n        "landmark": "",\r\n        "street": "",\r\n        "domainName": "",\r\n        "activationStatus": "WONT_FETCH",\r\n        "tobePaid": null,\r\n        "mobile": "9967374668",\r\n        "alternate_number": "",\r\n        "landline": "",\r\n        "compaddr": "",\r\n        "companyname": "zxygrocery",\r\n        "hoursofoperation": "09:00-21:00|09:00-21:00|09:00-21:00|09:00-21:00|09:00-21:00|09:00-21:00|09:00-21:00",\r\n        "deliveryduration": 2,\r\n        "supid": 85979793,\r\n        "contactperson": "sandeep jaiswar",\r\n        "storeid": "zxygroceryshopping",\r\n        "logo": "",\r\n        "latitude": 19.127729,\r\n        "longitude": 72.868403,\r\n        "set_docid": null,\r\n        "d_mobile": "",\r\n        "templates": {\r\n            "doctor": "",\r\n            "product/service": "18",\r\n            "restaurant": ""\r\n        },\r\n        "country": "India",\r\n        "countryCode": "IN",\r\n        "currencyCode": "INR",\r\n        "enableServiceWorker": 0,\r\n        "isdCode": 91,\r\n        "enableProductSmartFill": false,\r\n        "showOnlineBooking": false,\r\n        "sellOnlineInBulk": false,\r\n        "notesInCheckout": false,\r\n        "isEnabledJdPay": true,\r\n        "showAddBtn": false,\r\n        "kycStatus": null,\r\n        "isAutomatedCategorization": true,\r\n        "selectedVerticalsIds": "18",\r\n        "selectedVerticals": "Grocery",\r\n        "detailPageButtons": "onlyAddToCart",\r\n        "webListingPageSettings": {\r\n            "viewType": "grid",\r\n            "showAddToCartBtn": "true",\r\n            "showNetWeight": "true",\r\n            "showVariantDetails": "true",\r\n            "showVariantDetailsOn": "dropdown"\r\n        },\r\n        "mobileListingPageSettings": {\r\n            "viewType": "list",\r\n            "showAddToCartBtn": "true",\r\n            "showNetWeight": "true",\r\n            "showVariantDetails": "false",\r\n            "subCatViewType": "tab"\r\n        },\r\n        "vendor_language": "/en/en",\r\n        "websiteLang": "/en/en",\r\n        "disclaimerHtml": null\r\n    },\r\n    "getJSON": true,\r\n    "showAll": "1",\r\n    "channel": "WEBSITE",\r\n    "customerId": "63a34311498e35ffa7e1b22b"\r\n}`

    var config = {
      method: "post",
      url: "https://zxygroceryshopping.myomni.in/marketplace/webstore/getListingData.ns",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Content-Type": "application/json;charset=UTF-8",
        Cookie:
          "JDSESSIONID=28C243424B6CDC81AF9BDAD805261211; JDSESSIONID=28C243424B6CDC81AF9BDAD805261211; userType=ENDUSER; mpweb_tomcat=2318051520.45346.0000; my_omni=3642206400.20480.0000; webtype=undefined; googtrans=/en/en; googtrans=/en/en; NSSESSION=s%3Au_dyUt-dhtqik1VApDKZG7uGU50toNFp.L5dH%2BGXV%2F5z67y8Y7mrueOmJI%2FKYInm0YKwHbHuGIQk; PHPWEBSTORESESSION=u_dyUt-dhtqik1VApDKZG7uGU50toNFp; staySignIn=NDYwMTA1NzU4NzM4NTgyNDI0MMK1QMK1QDg1OTc5Nzk0wrVAwrVAMTcwMzE3OTk3ODM0OA==; jdomni=1343727808.20480.0000; my_omni=3642206400.20480.0000",
        Origin: "https://zxygroceryshopping.myomni.in",
        Pragma: "no-cache",
        Referer: "https://zxygroceryshopping.myomni.in/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "sec-ch-ua":
          '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
      data: data,
    }

    const res = await axios(config)
    const dataRes = res.data.listingData.productData.items
    const newData = []
    for (let index = 0; index < dataRes.length; index++) {
      const element = dataRes[index]
      const productData: ProductDto = JSON.parse(JSON.stringify(element))
      const newProduct = await this.product.create({
        ...productData,
      })
      newData.push(newProduct)
    }
    return response.send(newData)
  }
}

export default ProductController