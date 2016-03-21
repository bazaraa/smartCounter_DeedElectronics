package mn.itzone.ntc.config;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebMvcSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

 
    private static PasswordEncoder encoder;

    @Autowired
    private UserDetailsService userDetailsService;

//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web
//			.ignoring()
//				.antMatchers("/**/*.css", "/**/*.png", "/**/*.gif", "/**/*.jpg");
//	}
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {        
        http
        .authorizeRequests()
        	.antMatchers("/online/**").permitAll() 
            .antMatchers("/public/**").permitAll() 
            .anyRequest().fullyAuthenticated()
            .and()
        .formLogin()
        	.loginPage("/login")
        	.failureUrl("/login?error")
            .usernameParameter("username")
        	.defaultSuccessUrl("/")
            .permitAll()
            .and()
        .logout()         
        	.logoutUrl("/logout")   
            .deleteCookies("remember-me")
            .logoutSuccessUrl("/login")                  
            .permitAll()
            .and()
            .rememberMe();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        if(encoder == null) {
            encoder = new BCryptPasswordEncoder();
        }

        return encoder;
    }
}
