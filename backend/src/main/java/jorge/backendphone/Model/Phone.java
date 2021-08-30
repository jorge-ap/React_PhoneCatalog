package jorge.backendphone.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.engine.jdbc.BlobProxy;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import javax.persistence.*;
import java.io.IOException;
import java.sql.Blob;

@Entity
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(unique = true)
    private String name;

    @Column
    private String manufacturer;

    @Column
    private float price;

    @Column
    private String screen;

    @Column
    private int RAM;

    @Column
    private int year;

    @JsonIgnore
    @Lob
    private Blob image;

    public Phone() {
    }

    public Phone(String name, String manufacturer, float price, String screen, int RAM, int year) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
        this.screen = screen;
        this.RAM = RAM;
        this.year = year;
        try {
            Resource resource = new ClassPathResource("/static/images/default.png");
            setImage(BlobProxy.generateProxy(resource.getInputStream()
                    , resource.contentLength()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void addImageFromResources(String name){
        try {
            Resource resource = new ClassPathResource("/static/images/"+name+ ".jpg");
            setImage(BlobProxy.generateProxy(resource.getInputStream()
                    , resource.contentLength()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getScreen() {
        return screen;
    }

    public void setScreen(String screen) {
        this.screen = screen;
    }

    public int getRAM() {
        return RAM;
    }

    public void setRAM(int RAM) {
        this.RAM = RAM;
    }


    public Blob getImage() {
        return image;
    }

    public void setImage(Blob image) {
        this.image = image;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
