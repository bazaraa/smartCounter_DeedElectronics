package mn.itzone.ntc.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "roles")
public class Role extends BaseObject{

	private static final long serialVersionUID = -8096719459829665658L;

	@Column(length=255)
	private String code;
	
	@Nationalized
	@Column(length=255)
	private String name;

	@Nationalized
	@Column(length=2000)
	private String description;

    @ManyToMany(fetch=FetchType.LAZY)
	private List<Permission> permissions;

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

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}