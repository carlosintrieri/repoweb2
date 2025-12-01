package com.automanager.autoboots.controller;

import com.automanager.autoboots.model.Cliente;
import com.automanager.autoboots.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService service;

    // NÍVEL 3 RMM - HATEOAS: Criar Cliente com links hipermídia
    @PostMapping
    public ResponseEntity<EntityModel<Cliente>> criar(@RequestBody Cliente cliente) {
        Cliente clienteCriado = service.criar(cliente);
        
        // Criar links HATEOAS
        Link selfLink = linkTo(methodOn(ClienteController.class).buscarPorId(clienteCriado.getId())).withSelfRel();
        Link allClientesLink = linkTo(methodOn(ClienteController.class).listarTodos()).withRel("all-clientes");
        Link updateLink = linkTo(methodOn(ClienteController.class).atualizar(clienteCriado.getId(), null)).withRel("update");
        Link deleteLink = linkTo(methodOn(ClienteController.class).excluir(clienteCriado.getId())).withRel("delete");
        
        // Adicionar links ao cliente
        clienteCriado.add(selfLink);
        clienteCriado.add(allClientesLink);
        clienteCriado.add(updateLink);
        clienteCriado.add(deleteLink);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(EntityModel.of(clienteCriado));
    }

    // NÍVEL 3 RMM - HATEOAS: Listar todos com links hipermídia
    @GetMapping
    public ResponseEntity<CollectionModel<Cliente>> listarTodos() {
        List<Cliente> clientes = service.obterTodos();
        
        // Adicionar links em cada cliente
        for (Cliente cliente : clientes) {
            Link selfLink = linkTo(methodOn(ClienteController.class).buscarPorId(cliente.getId())).withSelfRel();
            Link updateLink = linkTo(methodOn(ClienteController.class).atualizar(cliente.getId(), null)).withRel("update");
            Link deleteLink = linkTo(methodOn(ClienteController.class).excluir(cliente.getId())).withRel("delete");
            
            cliente.add(selfLink);
            cliente.add(updateLink);
            cliente.add(deleteLink);
        }
        
        // Link para a coleção
        Link selfLink = linkTo(methodOn(ClienteController.class).listarTodos()).withSelfRel();
        Link createLink = linkTo(methodOn(ClienteController.class).criar(null)).withRel("create");
        
        CollectionModel<Cliente> collectionModel = CollectionModel.of(clientes, selfLink, createLink);
        
        return ResponseEntity.ok(collectionModel);
    }

    // NÍVEL 3 RMM - HATEOAS: Buscar por ID com links hipermídia
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        return service.obterPorId(id)
                .map(cliente -> {
                    Link selfLink = linkTo(methodOn(ClienteController.class).buscarPorId(id)).withSelfRel();
                    Link allClientesLink = linkTo(methodOn(ClienteController.class).listarTodos()).withRel("all-clientes");
                    Link updateLink = linkTo(methodOn(ClienteController.class).atualizar(id, null)).withRel("update");
                    Link deleteLink = linkTo(methodOn(ClienteController.class).excluir(id)).withRel("delete");
                    
                    cliente.add(selfLink);
                    cliente.add(allClientesLink);
                    cliente.add(updateLink);
                    cliente.add(deleteLink);
                    
                    return ResponseEntity.ok(cliente);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // NÍVEL 2 RMM - PUT para atualizar
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(@PathVariable Long id, @RequestBody Cliente cliente) {
        try {
            Cliente clienteAtualizado = service.atualizar(id, cliente);
            
            Link selfLink = linkTo(methodOn(ClienteController.class).buscarPorId(id)).withSelfRel();
            Link allClientesLink = linkTo(methodOn(ClienteController.class).listarTodos()).withRel("all-clientes");
            Link deleteLink = linkTo(methodOn(ClienteController.class).excluir(id)).withRel("delete");
            
            clienteAtualizado.add(selfLink);
            clienteAtualizado.add(allClientesLink);
            clienteAtualizado.add(deleteLink);
            
            return ResponseEntity.ok(clienteAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // NÍVEL 2 RMM - DELETE para excluir
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        try {
            service.excluir(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
