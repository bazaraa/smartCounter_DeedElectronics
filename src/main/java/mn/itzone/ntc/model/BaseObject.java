package mn.itzone.ntc.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import mn.itzone.ntc.util.GUIDException;
import mn.itzone.ntc.util.GUIDGenerator;

@MappedSuperclass
public abstract class BaseObject implements Serializable{

	private static final long serialVersionUID = 2846714753042823280L;

	@Id
	@GeneratedValue
	private Long id;

	@Column(length = 32, insertable = true, updatable = false)
	private String uuid;

	@ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id")
	private User createdUser;

	@Column(name = "created_date", updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date createdDate;

	@ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
	@JoinColumn(name = "modified_user_id")
	private User modifiedUser;

	@Column(name = "modified_date")
	@Temporal(TemporalType.TIMESTAMP)
	private Date modifiedDate;

	@ManyToOne(cascade = { CascadeType.DETACH }, fetch = FetchType.LAZY)
	@JoinColumn(name = "deleted_user_id")
	private User deletedUser;

	@Temporal(TemporalType.TIMESTAMP)
	private Date deletedDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public User getModifiedUser() {
		return modifiedUser;
	}

	public void setModifiedUser(User modifiedUser) {
		this.modifiedUser = modifiedUser;
	}

	public Date getModifiedDate() {
		return modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}

	public User getDeletedUser() {
		return deletedUser;
	}

	public void setDeletedUser(User deletedUser) {
		this.deletedUser = deletedUser;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	
	public static String getUUID() {
		String uuid = null;
		try {
			GUIDGenerator gen = new GUIDGenerator();
			uuid = gen.getUnformatedUUID();
		} catch (GUIDException e) {
			e.printStackTrace();
		}

		return uuid;
	}
	
	public boolean equals(Object o) {
		if (this == o)
			return true;

		if (o == null)
			return false;

		if (!(o instanceof BaseObject)) {
			return false;
		}

		final BaseObject e = (BaseObject) o;

		if (e.getId() == null)
			return false;

		if (this.getId() == null)
			return false;
		return getId().equals(e.getId());
	}

}
