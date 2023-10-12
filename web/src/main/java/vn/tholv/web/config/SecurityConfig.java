package vn.tholv.web.config;

import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import vn.tholv.web.config.filter.JwtAuthFilter;
import vn.tholv.web.core.base.dao.UserDao;
import vn.tholv.web.core.override.util.SecurityDataSource;
import vn.tholv.web.core.override.util.SecurityPath;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@Slf4j
public class SecurityConfig {
    private JwtAuthFilter authFilter;
    private PasswordEncoder passwordEncoder;
    private UserDao userDao;
    private SecurityPath securityPath;


    @Autowired
    public SecurityConfig(JwtAuthFilter authFilter, PasswordEncoder passwordEncoder, UserDao userDao, SecurityPath securityPath) {
        this.authFilter = authFilter;
        this.passwordEncoder = passwordEncoder;
        this.userDao = userDao;
        this.securityPath = securityPath;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userDao::findByUsername;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        List<SecurityDataSource> securityDataSources = securityPath.getPathSecurity();
        return http.csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable)
            .anonymous(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {
                securityDataSources.stream().forEach(value -> {
                    if (value.isPermitAll()) {
                        auth.requestMatchers(value.getPaths().toArray(new String[0])).permitAll();
                    }
                    if (value.isDenyAll()) {
                        auth.requestMatchers(value.getPaths().toArray(new String[0])).denyAll();
                    }
                    if (value.isAuthenticated()) {
                        auth.requestMatchers(value.getPaths().toArray(new String[0])).authenticated();
                    }
                    if (value.getRole() != null) {
                        auth.requestMatchers(value.getPaths().toArray(new String[0])).hasAuthority(value.getRole());
                    }
                    if (value.isAnonymous()) {
                        auth.requestMatchers(value.getPaths().toArray(new String[0])).anonymous();
                    }
                });
            })
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder);
        return authenticationProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // turn off cors
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new org.springframework.web.filter.CorsFilter(source);
    }

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizeJacksonObjectMapper() {
        return jacksonObjectMapperBuilder -> jacksonObjectMapperBuilder.modulesToInstall(new JavaTimeModule());
    }
}