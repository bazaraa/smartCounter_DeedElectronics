package mn.itzone.ntc.model;

import org.springframework.security.core.authority.AuthorityUtils;

@SuppressWarnings("serial")
public class CurrentUser extends
		org.springframework.security.core.userdetails.User {

	private User user;
	
	public static String[] codes;

	public CurrentUser(User user) {	
		super(user.getUsername(), user.getPassword(), AuthorityUtils.createAuthorityList(getPermissionList(user)));
		this.user = user;
	}

	public User getUser() {
		return user;
	}

	public Role getRole() {
		return user.getRole();
	}
	
	 public static String [] getPermissionList(User user){
		 codes = new String[user.getRole().getPermissions().size() + 1];
		 codes[0] = user.getRole().getCode();
		 int index = 1;
	        for (Permission per : user.getRole().getPermissions()) {
	        	System.err.println("index :" + index);
	        	codes[index] = per.getCode();
	        	index++;
			}
	        
	     System.err.println("end :" + codes.length);
		 return codes;
	 } 
   
	@Override
	public String toString() {
		return "CurrentUser{" + "user=" + user + "} " + super.toString();
	}
}
