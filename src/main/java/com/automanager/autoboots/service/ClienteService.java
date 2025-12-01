package com.automanager.autoboots.service;

import com.automanager.autoboots.model.Cliente;
import com.automanager.autoboots.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    @Transactional
    public Cliente criar(Cliente cliente) {
        cliente.setDataCadastro(new Date());
        return repository.save(cliente);
    }

    public List<Cliente> obterTodos() {
        return repository.findAll();
    }

    public Optional<Cliente> obterPorId(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Cliente atualizar(Long id, Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = repository.findById(id);
        if (clienteExistente.isPresent()) {
            Cliente cliente = clienteExistente.get();
            cliente.setNome(clienteAtualizado.getNome());
            cliente.setNomeSocial(clienteAtualizado.getNomeSocial());
            cliente.setDataNascimento(clienteAtualizado.getDataNascimento());
            cliente.setDocumentos(clienteAtualizado.getDocumentos());
            cliente.setEndereco(clienteAtualizado.getEndereco());
            cliente.setTelefones(clienteAtualizado.getTelefones());
            return repository.save(cliente);
        }
        throw new RuntimeException("Cliente não encontrado com id: " + id);
    }

    @Transactional
    public void excluir(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Cliente não encontrado com id: " + id);
        }
    }
}
