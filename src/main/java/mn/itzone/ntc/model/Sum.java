package mn.itzone.ntc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Nationalized;
@Entity
@Table(name = "sums")
public class Sum extends BaseObject{
	
	private static final long serialVersionUID = 8130155503107623824L;
	@Nationalized
	@Column(length = 255)
	private String name;
	@ManyToOne
	private Aimag aimag;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Aimag getAimag() {
		return aimag;
	}

	public void setAimag(Aimag aimag) {
		this.aimag = aimag;
	}

}
