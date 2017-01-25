package mn.mnba.mnba.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Nationalized;

@Entity
@Table(name = "users")
public class User extends BaseObject {

	private static final long serialVersionUID = -299188469959725545L;

	@Nationalized
	@Column(length = 255)
	private String firstName;

	@Nationalized
	@Column(length = 255)
	private String lastName;

	@Nationalized
	@Column(length = 255)
	private String regName;

	private String phone;

	@Column(length = 255)
	private String email;

	@Nationalized
	@Column(length = 255)
	private String address;

	@Column(length = 255, name = "username", nullable = false, unique = true)
	private String username;

	@Column(length = 255, name = "password", nullable = true)
	private String password;

	@ManyToOne(fetch = FetchType.LAZY)
	private Role role;

	private boolean isSysUser;

	private boolean isActive;

	@Transient
	private boolean isChangedPassword;

	@Transient
	private String passwordRepeated;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getRegName() {
		return regName;
	}

	public void setRegName(String regName) {
		this.regName = regName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	public boolean isSysUser() {
		return isSysUser;
	}

	public void setSysUser(boolean isSysUser) {
		this.isSysUser = isSysUser;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public boolean isChangedPassword() {
		return isChangedPassword;
	}

	public void setChangedPassword(boolean isChangedPassword) {
		this.isChangedPassword = isChangedPassword;
	}

	public String getPasswordRepeated() {
		return passwordRepeated;
	}

	public void setPasswordRepeated(String passwordRepeated) {
		this.passwordRepeated = passwordRepeated;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
