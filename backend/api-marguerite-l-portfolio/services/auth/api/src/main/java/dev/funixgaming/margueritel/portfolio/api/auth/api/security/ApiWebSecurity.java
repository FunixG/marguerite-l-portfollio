package dev.funixgaming.margueritel.portfolio.api.auth.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Add annotations :
 * Configuration
 * EnableWebSecurity
 */
public abstract class ApiWebSecurity {

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    protected ApiWebSecurity() {
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http = http.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer
                        .configurationSource(permitAllCors()))
                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(httpSecuritySessionManagementConfigurer ->
                        httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(Customizer.withDefaults())

                .authorizeHttpRequests(getUrlsMatchers())
                .addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public FilterRegistrationBean<JwtTokenFilter> jwtFilterRegistration(JwtTokenFilter filter) {
        FilterRegistrationBean<JwtTokenFilter> registration = new FilterRegistrationBean<>(filter);
        registration.setEnabled(false);
        return registration;
    }

    /**
     * Example code
     * <code>
     *             return exchanges -> exchanges
     *                 .requestMatchers("/kubeinternal/**").permitAll()
     *                 .requestMatchers(HttpMethod.POST, "/user/auth/register**", "/user/auth/login**").permitAll()
     *                 .requestMatchers(HttpMethod.GET, "/user/auth/current**").authenticated()
     *                 .requestMatchers(HttpMethod.POST, "/user/auth/logout**").authenticated()
     *                 .requestMatchers("/user**").hasAuthority(UserRole.ADMIN.getRole())
     *                 .anyRequest().authenticated();
     * </code>
     */
    public abstract Customizer<AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry> getUrlsMatchers();

    public static CorsConfigurationSource permitAllCors() {
        var config = new CorsConfiguration();
        config.addAllowedHeader(CorsConfiguration.ALL);
        config.addAllowedMethod(CorsConfiguration.ALL);
        config.setAllowedOriginPatterns(Arrays.asList("http://*", "https://*"));
        config.setAllowCredentials(true);

        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
