package mn.itzone.ntc.util;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;

public class CRSWebUtils {
	
	public static String getFileExtension(String fileName) {
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
        return fileName.substring(fileName.lastIndexOf("."));
        else return "";
    }
	
	public static String readableFileSize(long size) {
	    if(size <= 0) return "0";
	    final String[] units = new String[] { "B", "KB", "MB", "GB", "TB" };
	    int digitGroups = (int) (Math.log10(size)/Math.log10(1024));
	    return new DecimalFormat("#,##0.#").format(size/Math.pow(1024, digitGroups)) + " " + units[digitGroups];
	}    

    /**
     * Encodes the byte array into base64 string
     *
     * @param imageByteArray - byte array
     * @return String a {@link java.lang.String}
     */
    public static String encodeImage(byte[] imageByteArray) {
        return Base64.getEncoder().encodeToString(imageByteArray);
    }
 
    /**
     * Decodes the base64 string into byte array
     *
     * @param imageDataString - a {@link java.lang.String}
     * @return byte array
     */
    public static byte[] decodeImage(String imageDataString) {
        return Base64.getDecoder().decode(imageDataString);
    }
    
    /**
     * Converts a given Image into a BufferedImage
     *
     * @param img The Image to be converted
     * @return The converted BufferedImage
     */
    public static BufferedImage toBufferedImage(Image img)
    {
        if (img instanceof BufferedImage)
        {
            return (BufferedImage) img;
        }

        // Create a buffered image with transparency
        BufferedImage bimage = new BufferedImage(img.getWidth(null), img.getHeight(null), BufferedImage.SCALE_SMOOTH);

        // Draw the image on to the buffered image
        Graphics2D bGr = bimage.createGraphics();
        bGr.drawImage(img, 0, 0, null);
        bGr.dispose();

        // Return the buffered image
        return bimage;
    }
    
    public static String findTimeZodiacByTime(String time, boolean shift){
    	String item = "";
    	
    	try {


    		if(shift)
    		{
    			SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
    			
	            Date inTime = format.parse(time);
	            Calendar calendar1 = Calendar.getInstance();
	            calendar1.setTime(inTime);
	            calendar1.add(Calendar.HOUR_OF_DAY, 1);
	            
	            
	            time = format.format(calendar1.getTime());	            
    		}
            
    		
    		if(CRSWebUtils.isTimeBetweenTwoTime("23:40:00", "01:39:59", time))
    			return "Хулгана цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("01:40:00", "03:39:59", time))
    			return "Үхэр цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("03:40:00", "05:39:59", time))
    			return "Бар цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("05:40:00", "07:39:59", time))
    			return "Туулай цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("07:40:00", "09:39:59", time))
    			return "Луу цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("09:40:00", "11:39:59", time))
    			return "Могой цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("11:40:00", "13:39:59", time))
    			return "Морь цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("13:40:00", "15:39:59", time))
    			return "Хонь цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("15:40:00", "17:39:59", time))
    			return "Бич цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("17:40:00", "19:39:59", time))
    			return "Тахиа цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("19:40:00", "21:39:59", time))
    			return "Нохой цаг";
    		else if(CRSWebUtils.isTimeBetweenTwoTime("21:40:00", "23:39:59", time))
    			return "Гахай цаг";
    		
    	} catch (Exception e) {
    		item = "";
    	}
    	
    	return item;
    }
    
    public static boolean isTimeBetweenTwoTime(String initialTime, String finalTime, String currentTime) {
        String reg = "^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$";

    	try {
        
	        if (initialTime.matches(reg) && finalTime.matches(reg) && currentTime.matches(reg)) {
	            boolean valid = false;
	            //Start Time
	            java.util.Date inTime = new SimpleDateFormat("HH:mm:ss").parse(initialTime);
	            Calendar calendar1 = Calendar.getInstance();
	            calendar1.setTime(inTime);
	
	            //Current Time
	            java.util.Date checkTime = new SimpleDateFormat("HH:mm:ss").parse(currentTime);
	            Calendar calendar3 = Calendar.getInstance();
	            calendar3.setTime(checkTime);
	
	            //End Time
	            java.util.Date finTime = new SimpleDateFormat("HH:mm:ss").parse(finalTime);
	            Calendar calendar2 = Calendar.getInstance();
	            calendar2.setTime(finTime);
	
	            if (finalTime.compareTo(initialTime) < 0) {
	                calendar2.add(Calendar.DATE, 1);
	                calendar3.add(Calendar.DATE, 1);
	            }
	
	            java.util.Date actualTime = calendar3.getTime();
	            if ((actualTime.after(calendar1.getTime()) || actualTime.compareTo(calendar1.getTime()) == 0) 
	                    && actualTime.before(calendar2.getTime())) {
	                valid = true;
	            }
	            return valid;
	        } else {
	        	return false;
	        }
    	} catch (ParseException e) {
    		return false;
    	}
    }
    
    
    public static String DateTimeFormat(Date date){
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd HH:mm");
    	if(date != null)
    		return dateFormat.format(date);
    	else
    		return "";
    }
    public static String DateFormat(Date date){
    	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");
    	if(date != null)
    		return dateFormat.format(date);
    	else
    		return "";
    }
    
    public static String agoStringFromDate(Date date)
    {
    	String agoString = "";
    	
    	
    	if(date != null)
    	{
    		Date now = new Date();
    		long seconds = (now.getTime()-date.getTime())/1000;
    		
    		long count = 1;
    		if(seconds < 60) {
    			agoString = "дөнгөж сая";
    		}else if(seconds < 3600){    			
    			count = seconds / 60;
    			agoString = count + " мин";    			
    		}else if(seconds < 86400) {  			
    			count = seconds / 3600;
    			agoString = count + " цаг";    			
    		}else if(seconds < 605800) {
    			agoString = "өчигдөр";    			
    		}else if(seconds < 345600) {
    			agoString = "уржигдар";    			
    		}else if(seconds < 691200) {
    			count = seconds / 605800;
    			agoString = count + " өдөр";    			
    		}else if (seconds < 2629743) {
    			count = seconds / 2629743;
    			agoString = count + " долоо хоног";
		    } else if (seconds < 31556926) {
    			count = seconds / 18174000;
    			agoString = count + " сар";
		    } else {
    			count = seconds / 31556926;
    			//count = seconds / 378683112;
    			agoString = count + " жил";
		    }
    	}
    	
    	return agoString;
    }
}
