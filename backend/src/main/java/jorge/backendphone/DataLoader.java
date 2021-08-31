package jorge.backendphone;

import jorge.backendphone.Model.Phone;
import jorge.backendphone.Service.PhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class DataLoader {

    @Autowired
    private PhoneService phoneService;

    @PostConstruct
    public void dataInitialization(){

        Phone iphone12 = new Phone("iPhone 12", "Apple", 1259, "6.34", 6, 2020);
        iphone12.addImageFromResources("iPhone 12");
        phoneService.savePhone(iphone12);

        Phone iphone11 = new Phone("iPhone 11", "Apple", 1098, "6.2", 3, 2020);
        iphone11.addImageFromResources("iPhone 11");
        phoneService.savePhone(iphone11);

        Phone iphoneX = new Phone("iPhone X", "Apple", 1259, "6.26", 6, 2019);
        iphoneX.addImageFromResources("iPhone X");
        phoneService.savePhone(iphoneX);

        Phone samsung21FE = new Phone("Samsung S21 FE", "Samsung", 1759, "6.4", 8, 2021);
        samsung21FE.addImageFromResources("Samsung S21 FE");
        phoneService.savePhone(samsung21FE);

        Phone huaweiP40Pro = new Phone("Huawei Mate 40 Pro", "Huawei", 2000, "6.6", 8, 2021);
        huaweiP40Pro.addImageFromResources("Huawei Mate 40 pro");
        phoneService.savePhone(huaweiP40Pro);

        Phone xiaomiMi11 = new Phone("Xiaomi Mi 11", "Xiaomi", 1500, "6.43", 5, 2021);
        xiaomiMi11.addImageFromResources("Xiaomi Mi 11");
        phoneService.savePhone(xiaomiMi11);

    }

}
