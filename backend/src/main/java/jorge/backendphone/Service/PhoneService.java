package jorge.backendphone.Service;

import jorge.backendphone.Model.Phone;
import jorge.backendphone.Repository.PhoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhoneService {

    @Autowired
    private PhoneRepository phoneRepository;

    public List<Phone> getAllPhones(){
        return phoneRepository.findAll();
    }

    public Optional<Phone> getPhoneById(long id){ return phoneRepository.findById(id); }

    public void savePhone(Phone phone){
        phoneRepository.save(phone);
    }

    public void deletePhone(Phone phone){
        phoneRepository.delete(phone);
    }

    public long createPhone(Phone phone){
        phoneRepository.save(phone);
        return phone.getId();
    }

}
