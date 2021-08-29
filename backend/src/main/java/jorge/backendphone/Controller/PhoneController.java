package jorge.backendphone.Controller;

import jorge.backendphone.Controller.RequestBody.PhoneRequest;
import jorge.backendphone.Model.Phone;
import jorge.backendphone.Service.ImageService;
import jorge.backendphone.Service.PhoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import java.io.IOException;
import java.net.URI;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentRequest;

@RestController
@RequestMapping("/")
public class PhoneController {


    @Autowired
    private PhoneService phoneService;

    @Autowired
    private ImageService imageService;

    @CrossOrigin
    @GetMapping({"/", "/phones"})
    public ResponseEntity<List<Phone>> getPhones(){
        return ResponseEntity.ok(phoneService.getAllPhones());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Phone> getPhoneById(@PathVariable long id){
        Optional<Phone> optional = phoneService.getPhoneById(id);
        if (optional.isPresent()){
            Phone phone = optional.get();
            return ResponseEntity.ok(phone);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PostMapping("")
    public ResponseEntity<Phone> uploadPhone(@RequestBody PhoneRequest phoneRequest){
        String name = phoneRequest.getName();
        String manufacturer = phoneRequest.getManufacturer();
        float price = phoneRequest.getPrice();
        String screen = phoneRequest.getScreen();
        int RAM = phoneRequest.getRAM();
        int year = phoneRequest.getYear();

        Phone newPhone = new Phone(name, manufacturer, price, screen, RAM, year);
        long id = phoneService.createPhone(newPhone);
        URI location = fromCurrentRequest().path("/{id}")
                .buildAndExpand(id).toUri();
        return ResponseEntity.created(location).body(newPhone);
    }

    @CrossOrigin
    @PutMapping("/{id}")
    public ResponseEntity<Phone> uploadPhone(@PathVariable long id, @RequestBody PhoneRequest phoneRequest){
        Optional<Phone> optional = phoneService.getPhoneById(id);
        if (optional.isPresent()){
            Phone phone = optional.get();
            if (!phoneRequest.getName().isEmpty()){
                phone.setName(phoneRequest.getName());
            }
            if (!phoneRequest.getManufacturer().isEmpty()){
                phone.setManufacturer(phoneRequest.getManufacturer());
            }
            if (phoneRequest.getPrice() != null){
                phone.setPrice(phoneRequest.getPrice());
            }

            if (!phoneRequest.getScreen().isEmpty()){
                phone.setScreen(phoneRequest.getScreen());
            }

            if (phoneRequest.getRAM() != null){
                phone.setRAM(phoneRequest.getRAM());
            }

            phone.setYear(phoneRequest.getYear());
            phoneService.savePhone(phone);
            return ResponseEntity.ok(phone);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @DeleteMapping("/{id}")
    public ResponseEntity<Phone> deletePhone(@PathVariable long id) {
        Optional<Phone> optional = phoneService.getPhoneById(id);
        if (optional.isPresent()){
            phoneService.deletePhone(optional.get());
            return ResponseEntity.ok(optional.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @GetMapping("/{id}/image")
    public ResponseEntity<Object> getPhoneImage(@PathVariable long id) throws SQLException {
        Optional<Phone> optional = phoneService.getPhoneById(id);
        if (optional.isPresent()){
            return imageService.downloadPhoneImage(optional.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin
    @PostMapping("/{id}/image")
    public ResponseEntity<Phone> createPhoneImage(@PathVariable long id, @RequestParam MultipartFile imageFile) throws SQLException, IOException {
        Optional<Phone> optional = phoneService.getPhoneById(id);
        if (optional.isPresent()){
            return imageService.uploadImage(optional.get(), imageFile);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }


}
