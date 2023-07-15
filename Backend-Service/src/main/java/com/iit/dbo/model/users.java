package com.iit.dbo.model;

public class users {
	private String u_id;
	private String u_firstname;
	private String u_lastname;
//	private Bytea u_picture;
	private String u_email;
	private String u_street;
	private String u_city;
	private Integer u_zip;
	private String u_state;
	private Integer u_booklimit;
	private Integer u_fineamount;
	private String u_isactive;
	public String getU_id() {
		return u_id;
	}
	public void setU_id(String u_id) {
		this.u_id = u_id;
	}
	public String getU_firstname() {
		return u_firstname;
	}
	public void setU_firstname(String u_firstname) {
		this.u_firstname = u_firstname;
	}
	public String getU_lastname() {
		return u_lastname;
	}
	public void setU_lastname(String u_lastname) {
		this.u_lastname = u_lastname;
	}
	public String getU_email() {
		return u_email;
	}
	public void setU_email(String u_email) {
		this.u_email = u_email;
	}
	public String getU_street() {
		return u_street;
	}
	public void setU_street(String u_street) {
		this.u_street = u_street;
	}
	public String getU_city() {
		return u_city;
	}
	public void setU_city(String u_city) {
		this.u_city = u_city;
	}
	public Integer getU_zip() {
		return u_zip;
	}
	public void setU_zip(Integer u_zip) {
		this.u_zip = u_zip;
	}
	public String getU_state() {
		return u_state;
	}
	public void setU_state(String u_state) {
		this.u_state = u_state;
	}
	public Integer getU_booklimit() {
		return u_booklimit;
	}
	public void setU_booklimit(Integer u_booklimit) {
		this.u_booklimit = u_booklimit;
	}
	public Integer getU_fineamount() {
		return u_fineamount;
	}
	public void setU_fineamount(Integer u_fineamount) {
		this.u_fineamount = u_fineamount;
	}
	public String getU_isactive() {
		return u_isactive;
	}
	public void setU_isactive(String u_isactive) {
		this.u_isactive = u_isactive;
	}
	@Override
	public String toString() {
		return "users [u_id=" + u_id + ", u_firstname=" + u_firstname + ", u_lastname=" + u_lastname + ", u_email="
				+ u_email + ", u_street=" + u_street + ", u_city=" + u_city + ", u_zip=" + u_zip + ", u_state="
				+ u_state + ", u_booklimit=" + u_booklimit + ", u_fineamount=" + u_fineamount + ", u_isactive="
				+ u_isactive + "]";
	}



}