package mn.itzone.ntc.model;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import mn.itzone.ntc.model.enums.EquipmentTypeEnum;

@Entity
@Table(name = "equipments")
public class Equipment extends BaseObject {

	private static final long serialVersionUID = -7149639801905894244L;

	private String name;
	private String style;
	private String category;
	private String serialNumber;
	private String convoyDeviceName;
	private String convoyDeviceStyle;
	private String convoyDeviceSerialNumber;
	private String finance;
	private String price;
	private String supportDate;
	private String installedDep;
	private String installedRoom;
	private Date installedDate;
	private String buyWorkNumber;
	private String createdNation;
	private Date equipmentCreatedDate;
	private String ownerPossition;
	private String spareList;
	private String image;
	private String lifeTime;
	private String toPreventReview;
	
	@Enumerated(EnumType.ORDINAL)
	private EquipmentTypeEnum equipmentType;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getConvoyDeviceName() {
		return convoyDeviceName;
	}

	public void setConvoyDeviceName(String convoyDeviceName) {
		this.convoyDeviceName = convoyDeviceName;
	}

	public String getConvoyDeviceStyle() {
		return convoyDeviceStyle;
	}

	public void setConvoyDeviceStyle(String convoyDeviceStyle) {
		this.convoyDeviceStyle = convoyDeviceStyle;
	}

	public String getConvoyDeviceSerialNumber() {
		return convoyDeviceSerialNumber;
	}

	public void setConvoyDeviceSerialNumber(String convoyDeviceSerialNumber) {
		this.convoyDeviceSerialNumber = convoyDeviceSerialNumber;
	}

	public String getFinance() {
		return finance;
	}

	public void setFinance(String finance) {
		this.finance = finance;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getSupportDate() {
		return supportDate;
	}

	public void setSupportDate(String supportDate) {
		this.supportDate = supportDate;
	}

	public String getInstalledDep() {
		return installedDep;
	}

	public void setInstalledDep(String installedDep) {
		this.installedDep = installedDep;
	}

	public String getInstalledRoom() {
		return installedRoom;
	}

	public void setInstalledRoom(String installedRoom) {
		this.installedRoom = installedRoom;
	}

	public Date getInstalledDate() {
		return installedDate;
	}

	public void setInstalledDate(Date installedDate) {
		this.installedDate = installedDate;
	}

	public String getBuyWorkNumber() {
		return buyWorkNumber;
	}

	public void setBuyWorkNumber(String buyWorkNumber) {
		this.buyWorkNumber = buyWorkNumber;
	}

	public String getCreatedNation() {
		return createdNation;
	}

	public void setCreatedNation(String createdNation) {
		this.createdNation = createdNation;
	}

	public Date getEquipmentCreatedDate() {
		return equipmentCreatedDate;
	}

	public void setEquipmentCreatedDate(Date equipmentCreatedDate) {
		this.equipmentCreatedDate = equipmentCreatedDate;
	}

	public String getOwnerPossition() {
		return ownerPossition;
	}

	public void setOwnerPossition(String ownerPossition) {
		this.ownerPossition = ownerPossition;
	}

	public String getSpareList() {
		return spareList;
	}

	public void setSpareList(String spareList) {
		this.spareList = spareList;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getLifeTime() {
		return lifeTime;
	}

	public void setLifeTime(String lifeTime) {
		this.lifeTime = lifeTime;
	}

	public String getToPreventReview() {
		return toPreventReview;
	}

	public void setToPreventReview(String toPreventReview) {
		this.toPreventReview = toPreventReview;
	}

	public EquipmentTypeEnum getEquipmentType() {
		return equipmentType;
	}

	public void setEquipmentType(EquipmentTypeEnum equipmentType) {
		this.equipmentType = equipmentType;
	}
}
