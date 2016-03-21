package mn.itzone.ntc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import mn.itzone.ntc.model.enums.OrganizationLevelEnum;
import mn.itzone.ntc.model.enums.OrganizationTypeEnum;

import org.hibernate.annotations.Nationalized;

/**
 * @author shinebaatar.b
 *
 */
@Entity
@Table(name = "organizations")
public class Organization extends BaseObject {

	private static final long serialVersionUID = 3157715258005311544L;

	@Nationalized
	@Column(length = 255)
	private String name;

	@Nationalized
	@Column(length = 255)
	private String code;

	private String phone;

	@Nationalized
	@Column(length = 255)
	private String description;

	@Enumerated(EnumType.ORDINAL)
	private OrganizationTypeEnum organizationType;

	@Enumerated(EnumType.ORDINAL)
	private OrganizationLevelEnum organizationLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	private Aimag aimag;

	@ManyToOne(fetch = FetchType.LAZY)
	private Sum sum;

	private Long organizationId;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public OrganizationTypeEnum getOrganizationType() {
		return organizationType;
	}

	public void setOrganizationType(OrganizationTypeEnum organizationType) {
		this.organizationType = organizationType;
	}

	public OrganizationLevelEnum getOrganizationLevel() {
		return organizationLevel;
	}

	public void setOrganizationLevel(OrganizationLevelEnum organizationLevel) {
		this.organizationLevel = organizationLevel;
	}

	public Aimag getAimag() {
		return aimag;
	}

	public void setAimag(Aimag aimag) {
		this.aimag = aimag;
	}

	public Sum getSum() {
		return sum;
	}

	public void setSum(Sum sum) {
		this.sum = sum;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

}
