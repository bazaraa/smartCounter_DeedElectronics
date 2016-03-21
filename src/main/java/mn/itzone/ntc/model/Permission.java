package mn.itzone.ntc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "permissions")
public class Permission extends BaseObject{

	private static final long serialVersionUID = -8340577244874397249L;

	@Column(length=255)
	private String code;
	
	@Nationalized
	@Column(length=255)
	private String name;

	@Nationalized
	@Column(length=255)
	private String description;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
