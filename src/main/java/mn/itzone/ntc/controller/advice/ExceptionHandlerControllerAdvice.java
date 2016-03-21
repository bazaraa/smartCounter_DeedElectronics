package mn.itzone.ntc.controller.advice;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class ExceptionHandlerControllerAdvice {

	@SuppressWarnings("unused")
	private static Logger LOGGER = LoggerFactory
			.getLogger(ExceptionHandlerControllerAdvice.class);

	public static final String DEFAULT_ERROR_VIEW = "shared/error";
	  
	//@ExceptionHandler(NoSuchElementException.class)
	//@ResponseStatus(HttpStatus.NOT_FOUND)
    //@ExceptionHandler(IOException.class)
	//@ExceptionHandler(Exception.class)
	//@ResponseStatus(value = HttpStatus.NOT_FOUND)

    //@ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
	public String handleNoSuchElementException() {
		//return e.getMessage();
		return "redirect:/";
	}
	
	
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler({HttpMessageNotReadableException.class, MethodArgumentNotValidException.class, HttpRequestMethodNotSupportedException.class})
    public String badRequest(HttpServletRequest req, Exception exception) {
		return "redirect:/";
    }
	  

    @ExceptionHandler(value = {Exception.class, RuntimeException.class})
    public ModelAndView defaultErrorHandler(HttpServletRequest request, Exception e) {
            ModelAndView mav = new ModelAndView(DEFAULT_ERROR_VIEW);

        mav.addObject("datetime", new Date());
        
        mav.addObject("exception", e);
        
        mav.addObject("url", request.getRequestURL());
        return mav;
    }
	    
//	@ResponseBody
//	@ExceptionHandler(MaxUploadSizeExceededException.class)
//	@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED)
//	protected String handleMaxUploadSizeExceededException(
//			final HttpServletRequest request,
//			final HttpServletResponse response, final Throwable e)
//			throws IOException {
//		return e.getMessage();
//	}
//
//	@ResponseBody
//	@ExceptionHandler(MultipartException.class)
//	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
//	protected String handleGenericMultipartException(
//			final HttpServletRequest request,
//			final HttpServletResponse response, final Throwable e)
//			throws IOException {
//		return e.getMessage();
//	}
	
//	@ExceptionHandler({ApplicationException.class})
//	public void notFount(){
//		System.out.println("----------CaughtApplicationException-----------");
//	}
//
//	@ExceptionHandler({Exception.class})
//	public void notFountGlobal(){
//		System.out.println("----------CaughtApplicationException-----------");
//	}

}
