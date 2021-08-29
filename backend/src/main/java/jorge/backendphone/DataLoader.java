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

        phoneService.savePhone(new Phone("iPhone 12", "Apple", 1259, "6.34", 6, 2020));
        phoneService.savePhone(new Phone("iPhone 11", "Apple", 1098, "6.2", 3, 2020));
        phoneService.savePhone(new Phone("iPhone X", "Apple", 1259, "6.26", 6, 2019));
        phoneService.savePhone(new Phone("Samsung S21 FE", "Samsung", 1759, "6.4", 8, 2021));
    }

}
