package com.iit.dbo.model;

import javax.persistence.*;
import java.util.Set;
@Entity
@Table(name = "login_auth")
public class LoginAuth {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	private String username;
	private String u_type;
	private String password;
	private Integer otp_verification;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getU_type() {
		return u_type;
	}
	public void setU_type(String u_type) {
		this.u_type = u_type;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getOtp_verification() {
		return otp_verification;
	}
	public void setOtp_verification(Integer otp_verification) {
		this.otp_verification = otp_verification;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Set<Role> roles;
	@Override
	public String toString() {
		return "login_auth [username=" + username + ", u_type=" + u_type + ", password=" + password
				+ ", otp_verification=" + otp_verification + "]";
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	

}
