package dev.funixgaming.margueritel.portfolio.api.auth.api.security;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import dev.funixgaming.margueritel.portfolio.api.auth.api.clients.TokenClient;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "JwtTokenFilter")
public class JwtTokenFilter extends OncePerRequestFilter {

    private final Cache<String, Boolean> sessionsCache = CacheBuilder.newBuilder().expireAfterWrite(10, TimeUnit.MINUTES).build();
    private final TokenClient tokenClient;

    @Override
    protected void doFilterInternal(@NonNull final HttpServletRequest request,
                                    @NonNull final HttpServletResponse response,
                                    @NonNull final FilterChain chain) throws ServletException, IOException {
        final String bearerTokenHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (Strings.isEmpty(bearerTokenHeader) || !bearerTokenHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        final String[] tokenParts = bearerTokenHeader.split(" ");
        if (tokenParts.length != 2) {
            chain.doFilter(request, response);
            return;
        }

        final String token = tokenParts[1].trim();

        try {
            Boolean isValid = this.sessionsCache.getIfPresent(token);

            if (isValid == null) {
                isValid = this.tokenClient.checkToken(token);
                if (isValid) {
                    this.sessionsCache.put(token, isValid);
                }
            }

            if (isValid) {
                final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        "admin",
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
                );

                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            chain.doFilter(request, response);
        } catch (Exception e) {
            chain.doFilter(request, response);
        }
    }

}
