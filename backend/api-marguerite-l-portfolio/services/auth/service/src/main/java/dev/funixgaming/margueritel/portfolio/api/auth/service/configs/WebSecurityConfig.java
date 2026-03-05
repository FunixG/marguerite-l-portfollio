package dev.funixgaming.margueritel.portfolio.api.auth.service.configs;

import dev.funixgaming.margueritel.portfolio.api.auth.api.security.ApiWebSecurity;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final JwtTokenServiceFilter jwtTokenFilter;

    public WebSecurityConfig(JwtTokenServiceFilter jwtTokenFilter) {
        this.jwtTokenFilter = jwtTokenFilter;
    }

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http = http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer
                        .configurationSource(ApiWebSecurity.permitAllCors()))
                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(Customizer.withDefaults())

                .authorizeHttpRequests(exchanges -> exchanges
                        .requestMatchers(HttpMethod.POST, "/auth/setPassword").authenticated()
                        .anyRequest().permitAll()
                )
                .addFilterBefore(this.jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public FilterRegistrationBean<JwtTokenServiceFilter> jwtFilterRegistration(JwtTokenServiceFilter filter) {
        FilterRegistrationBean<JwtTokenServiceFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

}
