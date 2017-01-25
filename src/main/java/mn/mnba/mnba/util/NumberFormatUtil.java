package mn.mnba.mnba.util;

import java.beans.PropertyEditorSupport;

import org.springframework.web.bind.WebDataBinder;

public class NumberFormatUtil {
	public static void registerDoubleFormat (WebDataBinder binder) {
	    binder.registerCustomEditor(Double.TYPE, new CustomerDoubleEditor());
	}

	private static class CustomerDoubleEditor extends PropertyEditorSupport{    
	    public String getAsText() { 
	        Double d = (Double) getValue(); 
	        return d.toString(); 
	    } 

	    public void setAsText(String str) { 
	        if(str == null || str.trim().equals("")) {
	            setValue(0d); // you want to return double
	        } else {	        	
	        	str = str.replace(",", "");	        	
	            setValue(Double.parseDouble(str)); 
	        }
	    } 
	}
}
