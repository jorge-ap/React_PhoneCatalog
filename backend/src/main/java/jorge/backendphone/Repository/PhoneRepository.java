package jorge.backendphone.Repository;

import jorge.backendphone.Model.Phone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhoneRepository extends JpaRepository<Phone, Long> {


}
