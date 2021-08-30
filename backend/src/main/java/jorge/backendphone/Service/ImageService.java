package jorge.backendphone.Service;

import jorge.backendphone.Model.Phone;
import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;

@Service
public class ImageService {

    @Autowired
    private PhoneService phoneService;


    public ResponseEntity<Object> downloadPhoneImage(Phone phone) throws SQLException {

        Resource file = new InputStreamResource(phone.getImage().getBinaryStream());

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "image/jpeg").body(file);

    }


    public ResponseEntity<Phone> uploadImage(Phone phone, MultipartFile imageFile) throws IOException {

        if (imageFile != null) {
            if (!imageFile.isEmpty()) {
                phone.setImage(BlobProxy.generateProxy(
                        imageFile.getInputStream(), imageFile.getSize()));
            }
        }
        phoneService.savePhone(phone);
        return ResponseEntity.ok(phone);

    }


}
