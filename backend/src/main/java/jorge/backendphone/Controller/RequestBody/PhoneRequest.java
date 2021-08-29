package jorge.backendphone.Controller.RequestBody;


public class PhoneRequest {

    private String name;
    private String manufacturer;
    private Float price;
    private String screen;
    private Integer RAM;
    private Integer year;

    public PhoneRequest(String name, String manufacturer, Float price, String screen, Integer RAM, Integer year) {
        this.name = name;
        this.manufacturer = manufacturer;
        this.price = price;
        this.screen = screen;
        this.RAM = RAM;
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public Float getPrice() {
        return price;
    }

    public String getScreen() {
        return screen;
    }

    public Integer getRAM() {
        return RAM;
    }

    public Integer getYear() {
        return year;
    }
}
